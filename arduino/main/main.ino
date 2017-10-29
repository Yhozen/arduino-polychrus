/*
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

  TCRT5000
  Sensor      Arduino
  -----------      --------
  VCC               5V
  GND               GND
  DO                A3

*/
const int s0 = 8;
const int s1 = 9;
const int s2 = 12;
const int s3 = 11;
const int out = 10;
int trck = A3;
// Variables
int red = 0;
int green = 0;
int blue = 0;

void setup () {
  Serial.begin(9600);
  pinMode(s0, OUTPUT);
  pinMode(s1, OUTPUT);
  pinMode(s2, OUTPUT);
  pinMode(s3, OUTPUT);
  pinMode(out, INPUT);
  digitalWrite(s0, HIGH);
  digitalWrite(s1, HIGH);
}

void loop() {
  color();
  Serial.println(analogRead(trck));
  Serial.print("R Intensity:");
  Serial.print(red, DEC);
  Serial.print(" G Intensity: ");
  Serial.print(green, DEC);
  Serial.print(" B Intensity : ");
  Serial.print(blue, DEC);
  //Serial.println();

  if (red < blue && red < green && red < 20) {
    Serial.println(" - (Red Color)");
  } else if (blue < red && blue < green) {
    Serial.println(" - (Blue Color)");
  } else if (green < red && green < blue) {
    Serial.println(" - (Green Color)");
  } else {
    Serial.println();
  }
  delay(300);
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
}

