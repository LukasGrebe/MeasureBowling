<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo '[';
echo '{"id":"5", "player":{"name":"'.rand(1, 1500).'", "city":"warsaw"}, "rolls":"1010101010"},';
echo '{"id":"6", "player":{"name":"'.rand(1, 1500).'", "city":"warsaw"}, "rolls":"34 72 9/ 23 x 12 x x 08 5/3"}';
echo ']';