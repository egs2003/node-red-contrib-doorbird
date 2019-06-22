Am Eingang des Moduls wird der UDP-Broadcast der Doorbird erwartet. Der Broadcast erfolgt auf den UDP-Ports 6524 und 35344. Das UDP-Modul muss seine Daten als Buffer weitergeben.

![udp](images/udp.jpg)

Ab Seite 27 ist der Ablauf beschrieben, wie ein UDP-Broadcast-Paket verarbeitet werden muss.  
[Referenzdokument Doorbird API](https://www.doorbird.com/downloads/api_lan.pdf)

Die UDP-Broadcast-Pakete stehen für folgende Ergeinisse
- in regelmäßigen Abständen ein "noch-wach"-Signal
- bei Ereignis "Klingeln" (verschlüsselt)
- bei Ereignis "Bewegung" (verschlüsselt)

Der Input wird entschlüsselt und ausgewertet.  
Bei Ereigniss "Es klingelt" wird der Ausgang mit `true` getriggert.  
Bei Ereigniss "Es bewegt sich etwas" wird der Ausgang mit `false` getriggert.  


## Changelog
Version 0.2.4  
*NEW* - Node Status (RED 'error in decryption'), wenn Broadcast nicht entschlüsselt werden kann.

Version 0.1.8  
*FIX* - Auswertung Bewegung/Klingeln korrigiert.

