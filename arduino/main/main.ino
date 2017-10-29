/*
  CONEXIONES

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

char currentColor;

int puntos = 0;

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
  Serial.print(currentColor);
  delay(100);
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

void juego(char eleccion) {
  if (eleccion == currentColor) {
    puntos += 10;
  } else {
    puntos -= 5;
  }
}

