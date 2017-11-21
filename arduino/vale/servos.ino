/*
  CONEXIONES

  SERVO
  -----------      --------
  SIGNAL             7
  GND                GND
  POWER .            VCC

  TCS3200
  Color Sensor      Arduino
  -----------      --------
  VCC               5V
  GND               GND
  s0                8
  s1                9
  s2                12
  s3                11
  OUT               10
  OE                GND

*/
int stop_position = 0;
int velocity = 20;
int d = 300;

#include <Servo.h>
Servo servo1, servo2;

const int s0 = 8;
const int s1 = 9;
const int s2 = 12;
const int s3 = 11;
const int out = 10;
const int servoPin = 7;
const int pinServo2 = 6;

// Variables
int red = 0;
int green = 0;
int blue = 0;

char currentColor;

void setup () {
  Serial.begin(9600);
  pinMode(s0, OUTPUT);
  pinMode(s1, OUTPUT);
  pinMode(s2, OUTPUT);
  pinMode(s3, OUTPUT);
  pinMode(out, INPUT);
  digitalWrite(s0, HIGH);
  digitalWrite(s1, HIGH);
  servo1.attach(servoPin);
  servo2.attach(pinServo2);
  servo1.write(90);
  servo2.write(90);
}

void loop() {
  velocidad(1, servo1);
  velocidad(1, servo2);
  delay(10000);
  velocidad(2, servo1);
  velocidad(2, servo2);
  delay(10000);
}

void color () {
  digitalWrite(s2, LOW);
  digitalWrite(s3, LOW);
  //count OUT, pRed, RED
  red = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  digitalWrite(s3, HIGH);
  //count OUT, pBLUE, BLUE
  blue = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  digitalWrite(s2, HIGH);
  //count OUT, pGreen, GREEN
  green = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  if (red < blue && red < green && red < 20) {
    currentColor = 'r';
  } else if (blue < red && blue < green) {
    currentColor = 'b';
  } else if (green < red && green < blue) {
    currentColor = 'g';
  } else {
    Serial.println("No nuevo color detectado");
  }
}

void velocidad (int v, Servo s) {
  if (v == 1) {
    s.write(80);
    delay(10);
  } else if (v == 2) {
    s.write(stop_position + velocity);
    delay(d);
    s.write(stop_position - velocity);
    delay(d);
  } else if (v == 0) {
    s.write(90);
    delay(10);
  }
}

