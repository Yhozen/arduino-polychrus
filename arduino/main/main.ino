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

  KY-033
  Sensor      Arduino
  -----------      --------
  VCC               5V
  GND               GND
  DO                A3

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
const int dc = 3;
const int servoPin = 6;
const int echoPin = 6;
const int trigPin = 5;


// Variables
int red = 0;
int green = 0;
int blue = 0;
boolean on = false;
long distancia;
char readByte, colorActual;
int puntos = 0;

void setup () {
  BT.begin(9600);
  pinMode(s0, OUTPUT);
  pinMode(s1, OUTPUT);
  pinMode(s2, OUTPUT);
  pinMode(s3, OUTPUT);
  pinMode(out, INPUT);
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
  delay(5);
  if (colorActual == 'b') {
    avanzar(1000);
  }
}

void juego(char eleccion) {
  if (eleccion == colorActual) {
    puntos += 10;
  } else {
    puntos -= 5;
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
  red = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  digitalWrite(s3, HIGH);
  blue = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  green = pulseIn(out, digitalRead(out) == HIGH ? LOW : HIGH);
  if (red < blue && red < green && red < 20) {
    colorActual = 'r';
  } else if (blue < red && blue < green) {
    colorActual = 'b';
  } else if (green < red && green < blue) {
    colorActual = 'g';
  }
}

void bluetooth() {
  boolean readSomething = false;
  BT.listen();
  while (BT.available() > 0) {
    readByte = BT.read();
    readSomething = true;
  }
  delay(5);
  if (readSomething == true) {
    juego(readByte);
    delay(20);
    readSomething = false;
  }
}

void getDistancia() {
  long duracion;
  digitalWrite(trigPin, LOW);  // Added this line
  delayMicroseconds(2); // Added this line
  digitalWrite(trigPin, HIGH);
  //  delayMicroseconds(1000); - Removed this line
  delayMicroseconds(10); // Added this line
  digitalWrite(trigPin, LOW);
  duracion = pulseIn(echoPin, HIGH);
  distancia = (duracion / 2) / 29.1;
}

