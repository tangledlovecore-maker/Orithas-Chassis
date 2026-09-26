// Orithas-Chassis first embodiment loop
// Controller: Arduino UNO R4 Minima
// Loop: Püwterfly command -> servo movement -> switch feedback -> stop response

#include <Servo.h>

const int SERVO_PIN = 9;
const int LIMIT_PIN = 2;
const int POS_A = 30;
const int POS_B = 120;

Servo actuator;
bool stopped = true;

void reportState(const char* label) {
  int limitState = digitalRead(LIMIT_PIN);
  Serial.print(label);
  Serial.print(" LIMIT=");
  Serial.println(limitState == LOW ? "HIT" : "CLEAR");
}

void setup() {
  pinMode(LIMIT_PIN, INPUT_PULLUP);
  actuator.attach(SERVO_PIN);
  actuator.write(POS_A);
  Serial.begin(115200);
  while (!Serial) { ; }
  stopped = true;
  Serial.println("ORITHAS_FIRST_LOOP_READY");
  reportState("POSITION_A");
}

void moveTo(int target, const char* label) {
  if (digitalRead(LIMIT_PIN) == LOW) {
    stopped = true;
    Serial.println("STOPPED LIMIT_HIT_BEFORE_MOVE");
    return;
  }
  stopped = false;
  actuator.write(target);
  delay(500);
  reportState(label);
}

void loop() {
  if (!Serial.available()) return;

  String command = Serial.readStringUntil('\n');
  command.trim();

  if (command == "MOVE A") {
    moveTo(POS_A, "POSITION_A");
  } else if (command == "MOVE B") {
    moveTo(POS_B, "POSITION_B");
  } else if (command == "STOP") {
    stopped = true;
    actuator.write(POS_A);
    Serial.println("STOPPED");
  } else if (command == "STATE") {
    reportState("STATE");
  } else {
    Serial.print("UNKNOWN ");
    Serial.println(command);
  }
}
