int led = 13;

void setup () {
	Serial.begin(9600);
	pinMode(led, OUTPUT);
}

void loop () {
	delay(800);
	digitalWrite(led, HIGH);
	delay(800);
	digitalWrite(led, LOW);
}