void setup () {
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(11, OUTPUT);
}

void onOff(int led) {
  digitalWrite(led, HIGH);
  delay(100); 
  digitalWrite(led, LOW);
  delay(100);
}
void loop () {
  onOff(13);
  onOff(12);
  onOff(11);
}
