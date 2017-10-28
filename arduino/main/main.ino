int red = 3;
int blue = 5;
int green = 6;

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
 // Comprar led catodico
void loop() {
  delay(1200);
  color(241, 196, 15);
  delay(1200);
  color(44, 62, 80);
  delay(1200);
  color(192, 57, 43);
  delay(1200);
  color(22, 160, 133);
}


