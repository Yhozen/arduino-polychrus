#include <SoftwareSerial.h>

SoftwareSerial BT(0, 1);

void setup() {
  BT.begin(9600);
  BT.println("Bluetooth Ready.");
  BT.println("Waiting...");
  pinMode(13, OUTPUT);
  delay(1000);
}

void loop() {
  String readByte;
  boolean readSomething = false;
  BT.listen();
  while (BT.available() > 0) {
    readByte = BT.read();
    readSomething = true;
  }
  delay(5);
  if (readSomething == true) {
    delay(20);
    readSomething = false;
    BT.println(readByte);
    digitalWrite(13, HIGH);
    delay(500);
    digitalWrite(13, LOW);
  }
}
