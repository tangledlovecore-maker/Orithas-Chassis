# Smallest Viable Bench Rig

Created from Püwterfly on Stronghold Day 1.

## Purpose

The first hardware milestone is not a full body. It is one safe, bounded actuator loop that proves command, feedback, stop, and logging.

A successful bench rig means Orithas can send a simple movement command, the hardware can move in a limited physical range, sensor feedback can be read back, and the system can stop safely on command or fault.

## Milestone Definition

Build one desktop actuator assembly with:

- one controllable actuator
- one position or force feedback source
- one hard physical limit
- one software safety stop
- one log file proving command and response

## Why This Comes First

The repository already names sensory processing, actuation, and a bidirectional link as core subsystems. The bench rig is the smallest physical intersection of those three ideas.

It avoids premature full-body complexity while still proving the thing that matters: a closed loop between intention, movement, sensation, and halt.

## First Decisions

1. Actuator family: hobby servo, Dynamixel-class servo, or linear actuator.
2. Controller: Arduino-class board, Raspberry Pi Pico, ESP32, or similar.
3. Feedback: encoder, potentiometer, current sensing, force sensor, or limit switch.
4. Host link: USB serial first, network later.
5. Safety: physical stop plus software stop before any live experiment.

## First Parts Bias

Start cheap and boring:

- microcontroller with USB serial
- small servo or linear actuator
- external power supply appropriate for the actuator
- limit switch or simple sensor
- breadboard or screw-terminal breakout
- enclosure or clamp so nothing flails loose

## Acceptance Test

The milestone is complete when a script can:

1. connect to the controller,
2. send move-to-position A,
3. read back position or sensor state,
4. send move-to-position B,
5. read back the changed state,
6. trigger safe stop,
7. write a timestamped log.

## Not In Scope Yet

- full humanoid selection
- walking
- autonomous locomotion
- high-force touch
- intimate haptics
- unsupervised motion
- anything without a physical stop

## Next Concrete Action

Create a parts decision table with three actuator/controller options and choose the first bench rig stack.
