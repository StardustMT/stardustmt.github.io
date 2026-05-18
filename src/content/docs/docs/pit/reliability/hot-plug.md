---
title: "Hot-Plug"
description: "Target version: v0.3"
---

> USB MIDI / audio disconnect mid-show is handled gracefully. The show keeps running.

**Target version:** v0.3

## The problem

Every working musician has had a USB MIDI cable wiggle mid-show. Most music software treats device disconnect as fatal — audio stops, sometimes the app crashes. Stardust doesn't.

## What Stardust does

When a MIDI device disconnects:
1. Detected via platform notifications (CoreMIDI on macOS, WinMM on Windows)
2. UI shows non-blocking toast: "Roland RD-2000 disconnected"
3. The audio engine **keeps running** with remaining devices
4. Any notes currently held on the disconnected device's channels get an automatic note-off (prevent stuck notes)
5. Voice tracker entries for the device are cleared

When the device reconnects:
1. Auto-detected via the same notifications
2. UI shows toast: "Roland RD-2000 reconnected"
3. Mappings auto-restore (the device profile matches by ID, so settings re-apply)
4. Show continues

## Audio device hot-plug

Similar handling for audio devices:
- USB audio interface disconnects → fall back to system default output (laptop speakers if nothing else)
- "Audio interface lost — falling back to built-in" toast
- On reconnect, you can manually switch back via Settings (don't auto-switch — could be intentional)

Better silence-or-laptop-speakers than total dropout.

## Platform-specific implementation

### macOS
- CoreMIDI: `MIDIClientCreate` + `MIDIRestart` for device list updates
- CoreAudio: `AudioObjectAddPropertyListener` for device list changes
- Both signal asynchronously; we handle in a non-RT thread and queue events to the audio thread via lock-free channel

### Windows
- WinMM: poll `midiInGetNumDevs()` periodically (no clean push notification)
- WASAPI: `IMMDeviceEnumerator::RegisterEndpointNotificationCallback`
- Same lock-free queueing to audio thread

### Linux (post-1.0)
- ALSA: poll via `udev` events
- Same architecture

## Why most music software doesn't bother

Implementing this properly is annoying:
- Different APIs per platform
- Edge cases (device that disconnects and reconnects 10 times in a second)
- Race conditions with audio callback timing
- Cleanup state (what if a note was being held when device vanished?)

Stardust does the work because every musician has lived through this failure mode.

## What happens to held notes

When a MIDI device disconnects mid-note:
1. Voice tracker tracks every active note by source device
2. On disconnect, all notes from that device get auto note-off
3. Plugin sustain is cleared (sustain-off broadcast)
4. No stuck notes

If the *audio* device disconnects:
1. Sound just stops (can't output to disconnected device)
2. Voice tracker still cleans up notes when device returns
3. Held notes that wanted to continue won't be heard, but won't be stuck either

## UI feedback

Live Mode shows MIDI activity dots per device. When a device disconnects:
- Its dot turns red / fades out
- Tooltip: "Device disconnected"
- When it reconnects, dot returns to normal

Persistent notification in the status bar: "Roland RD-2000 disconnected · click to dismiss"

## Phase status

| Phase | What's available |
|---|---|
| v0.3 | MIDI + audio hot-plug detection, graceful recovery, voice cleanup |
| v0.4 | UI indicators in Live Mode |
| v0.5+ | Smarter audio reconnect (auto-switch back if user prefers) |

## Related pages

- [Voice Tracking](/docs/pit/reliability/voice-tracking/)
- [Plugin Crash Isolation](/docs/pit/reliability/plugin-crash-isolation/)
- [Device Profiles](/docs/pit/features/device-profiles/) (profile auto-applied on reconnect)
