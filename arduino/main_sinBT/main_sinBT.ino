/*
  CONEXIONES

  DC
  -----------      --------
  IN                 3
  OUT                GND

  SERVO
  -----------      --------
  SIGNAL             6
  GND                GND
  POWER .            VCC

  HC-SR04
  -----------      --------
  triggerPin         A0
  echo Pin           A1
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

#include <SoftwareSerial.h>
#include <Servo.h>

Servo cola;
SoftwareSerial BT(0, 1);

const int s0 = 8;
const int s1 = 9;
const int s2 = 12;
const int s3 = 11;
const int out = 10;
const int dc = 5;
const int servoPin = 6;
const int echoPin = A1;
const int trigPin = A0;
const int r = 2;
const int g = 3;
const int b = 4;


// Variables
int red = 0;
int green = 0;
int blue = 0;
long distancia;
char colorElige =  48;
char colorActual;
int puntos = 0;

void setup () {
  BT.begin(9600);
  pinMode(s0, OUTPUT);
  pinMode(s1, OUTPUT);
  pinMode(s2, OUTPUT);
  pinMode(s3, OUTPUT);
  pinMode(out, INPUT);
  pinMode(r, OUTPUT);
  pinMode(dc, OUTPUT);
  analogWrite(dc, 0);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  digitalWrite(s0, HIGH);
  digitalWrite(s1, HIGH);
  cola.attach(servoPin);
  cola.write(90);
  delay(500);
}

void loop() {
  color();
  getDistancia();
  bluetooth();
  delay(10);
  if (distancia > 15 ) {
    moverCola();
  } else {
    cola.write(90);
    analogWrite(dc, 0);
  }
  prenderLuz();
}

void app() {
  if (colorActual == colorElige) {
    analogWrite(dc,255);
  } else {
    analogWrite(dc, 0);
  }
}

void prenderLuz() {
  if (colorActual == 'r') {
    digitalWrite(r, HIGH);
    digitalWrite(g, LOW);
    digitalWrite(b, LOW);
  } else if (colorActual == 'g') {
    digitalWrite(g, HIGH);
    digitalWrite(b, LOW);
    digitalWrite(r, LOW);
  } else if (colorActual == 'b') {
    digitalWrite(b, HIGH);
    digitalWrite(r, LOW);
    digitalWrite(g, LOW);
  }
}

void velocidad(int n) {
  switch (n) {
    case 0:
      analogWrite(dc, 0);
    case 1:
      analogWrite(dc, 100);
    case 2:
      analogWrite(dc, 150);
    case 3:
      analogWrite(dc, 200);
    case 4:
      analogWrite(dc, 255);
  }
}

void color () {
  digitalWrite(s2, LOW);
  digitalWrite(s3, LOW);
  red = pulseIn(out, LOW);
  delay(5);
  digitalWrite(s2, HIGH);
  digitalWrite(s3, HIGH);
  green = pulseIn(out, LOW);
  delay(5);
  digitalWrite(s2, LOW);
  digitalWrite(s3, HIGH);
  blue = pulseIn(out, LOW);
  delay(5);
  if (red < blue && red < green && red < 20) {
    colorActual = 'r';
  } else if (blue < red && blue < green) {
    colorActual = 'b';
  } else if (green < red && green < blue) {
    colorActual = 'g';
  }
}

void juego(char color) {
  if (color == colorActual) {
    puntos += 100;
  }
}

void bluetooth() {
  boolean readSomething = false;
  BT.listen();
  while (BT.available() > 0) {
    colorElige = BT.read();
    readSomething = true;
  }
  delay(5);
  if (readSomething == true) {
    app();
    delay(20);
    readSomething = false;
  }
}

void moverCola() {
  cola.write(0);
  delay(500);
  cola.write(180);
  delay(500);
}

void getDistancia() {
  long duracion;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duracion = pulseIn(echoPin, HIGH);
  distancia = (duracion / 2) / 29.1;
}

