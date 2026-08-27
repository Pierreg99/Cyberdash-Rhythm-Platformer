# 🎵 CYBER DASH — PROCEDURAL AUDIO SYSTEM SPECIFICATION

CYBER DASH features a 100% procedural sound engine powered by the **Web Audio API**. It generates all music, rhythmic beats, sub-basslines, and sound effects in real time with zero external MP3/WAV download requirements.

---

## 1. Synthesis Engine Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Web Audio API Context                  │
│                     (Sample Rate: 44.1/48kHz)               │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
┌──────────────▼──────────────┐ ┌──────────────▼──────────────┐
│       MUSIC SYNTH BUS       │ │        SFX SYNTH BUS        │
│    (GainNode: Master Music) │ │     (GainNode: Master SFX)  │
└──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │
  ┌────────────┼────────────┐      ┌───────────┼───────────┐
  │            │            │      │           │           │
┌─▼────────┐ ┌─▼────────┐ ┌─▼──┐ ┌─▼───────┐ ┌─▼──────┐  ┌─▼─────┐
│Lead Synth│ │Sub-Bass  │ │Kick│ │Jump SFX │ │Orb SFX │  │Freeze │
│(Sawtooth)│ │  (Sine)  │ │/Hat│ │ (Sweep) │ │(Chime) │  │(Frost)│
└──────────┘ └──────────┘ └────┘ └─────────┘ └─────────┘  └───────┘
```

---

## 2. Dynamic Procedural Music Synthesis

The music engine uses a precision 16-step sequencer locked to the level's defined BPM ($120\text{ to }180\text{ BPM}$):

### 2.1 Lead Synthesizer
- **Oscillator**: Dual detuned `sawtooth` oscillators passed through an audio-reactive low-pass filter ($Q = 4.5$).
- **Arpeggiator Scales**: Minor pentatonic and cyberpunk Dorian mode frequency arrays:
  $$\text{Scale: } [A_3, C_4, D_4, E_4, G_4, A_4, C_5, D_5, E_5]$$
- **Envelope**: Exponential gain decay ($attack = 10\text{ms}, decay = 180\text{ms}$).

### 2.2 Sub-Bass Synthesizer
- **Oscillator**: Pure `sine` wave driven by frequency pitch envelopes ($55\text{Hz} \rightarrow 35\text{Hz}$).
- **Distortion**: Soft wave-shaper curve adding warm analog saturation.

### 2.3 Percussion & Beat Synthesis
- **Kick Drum**: Rapid pitch drop from $150\text{Hz}$ to $30\text{Hz}$ in $60\text{ms}$ with punchy transient click.
- **Hi-Hat**: White noise buffer burst through high-pass filter ($8000\text{Hz}$) with $30\text{ms}$ decay.
- **Snare**: Dual-component sound (bandpass noise + $180\text{Hz}$ body oscillator).

---

## 3. Sound Effects (SFX) Design

| Sound Effect | Waveform / Mechanism | Sonic Signature |
|---|---|---|
| **Jump** | Sine wave upward pitch sweep ($220\text{Hz} \rightarrow 480\text{Hz}$) | Crisp, punchy platformer leap |
| **Crash / Death** | Low-pass filtered noise + downward bass drop ($120\text{Hz} \rightarrow 20\text{Hz}$) | Heavy impact explosion |
| **Orb Trigger** | Triangle wave resonant bell chime ($880\text{Hz} \rightarrow 1320\text{Hz}$) | Bright celestial pulse |
| **Portal Warp** | FM modulated square wave with frequency sweep | Futuristic cyber teleport |
| **Freeze Trigger** | High-pass frost noise shimmer + crystal chime harmonic | Sub-zero crystalline snap |
| **Coin Collect** | Dual ascending arpeggio ($587\text{Hz} \rightarrow 880\text{Hz} \rightarrow 1174\text{Hz}$) | High-reward jackpot ping |

---

## 4. Performance & Audio Hygiene

- **Zero Garbage Collection**: Audio nodes are created and connected on demand with automated node disconnection upon sound termination (`node.stop()` + `node.disconnect()`).
- **Autoplay Handling**: Conforms to modern browser restrictions by initializing `AudioContext` in `suspended` mode, resuming automatically upon user's first tap or click.
