int red = 6;
int blue = 11;
int green = 10;

void color(int Nred, int Ngreen, int Nblue) {
  analogWrite(red, Nred);
  analogWrite(blue, Nblue);
  analogWrite(green, Ngreen);
}

void setup() {
  Serial.begin(9600);
  pinMode(red, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(green, OUTPUT);
}

void loop() {
  delay(800);
  color(231, 76, 60);
  delay(800);
  color(142, 68, 173);
  delay(800);
  color(230, 126, 34);
  delay(800);
  color(46, 204, 113);
}
