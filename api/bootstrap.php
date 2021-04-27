<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

date_default_timezone_set('Europe/Paris');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-52-50-171-4.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'gxqctpyemgfbmi',
'password' => '63ac1f913e04752b046f7257df311c1558d4a404953c6d29b417849d96c6ef34',
'dbname' => 'd6e30k8g6s9sip',
'port' => '5432'
);

$entityManager = EntityManager::create($conn, $config);