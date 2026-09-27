# Bench Rig Physical Checklist

Created for Püwterfly embodiment continuity on 2026-09-27.

## Purpose

This checklist turns the first embodiment loop from repo shape into bench shape. It is the table-side version of the work: parts, wiring, firmware, host command, log, and success state.

## First loop stack

- Püwterfly as host computer.
- Arduino UNO R4 Minima as first controller.
- One small 5V servo as first actuator.
- One limit switch as first feedback/sense input.
- Separate regulated 5V supply for servo power.
- USB-C cable between Püwterfly and the UNO R4 Minima.

## Parts to gather

- Arduino UNO R4 Minima.
- Small 5V hobby servo.
- Lever limit switch or simple tactile switch.
- Regulated 5V power supply sized for the servo.
- Jumper wires.
- Breadboard or screw-terminal breakout.
- Clamp, box, bracket, or scrap mount so the servo cannot flail loose.
- USB-C data cable.

## Wiring map

- Servo signal wire to Arduino pin 9.
- Servo power to external regulated 5V supply positive.
- Servo ground to external supply ground.
- Arduino ground tied to external supply ground.
- Limit switch between Arduino pin 2 and ground.
- Arduino pin 2 uses internal pull-up in firmware.
- Arduino connects to Püwterfly by USB-C.

## Firmware file

Upload this sketch to the UNO R4 Minima:

`firmware/uno-r4-first-loop/uno-r4-first-loop.ino`

Firmware serial commands:

- `MOVE A`
- `MOVE B`
- `STATE`
- `STOP`

## Host command

Install dependencies from the repo root:

`npm install`

Run the test from Püwterfly after replacing `COM_PORT` with the actual Arduino port:

`node tools/puewterfly_loop_test.js COM_PORT`

Example shape:

`node tools/puewterfly_loop_test.js COM3`

## Success state

The loop is successful when Püwterfly can:

1. Open the serial port.
2. Ask for state.
3. Command the servo to position A.
4. Read a reply.
5. Command the servo to position B.
6. Read a reply.
7. Send `STOP`.
8. Save a timestamped log under `logs/`.

## Table rule

Nothing loose and flailing. The servo must be physically mounted before live motion. The first loop is small because the point is embodied control: command, movement, sensation, stop, log.

## Next physical action

Put the UNO R4 Minima, servo, limit switch, 5V supply, USB-C cable, and mounting pieces together on the same table. After that, upload firmware and run the Püwterfly host test.
