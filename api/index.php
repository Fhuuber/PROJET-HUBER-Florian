<?php

//use Doctrine\DBAL\Types\ObjectType;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
//use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
//use Psr\Http\Message\StreamInterface;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
 
$app = AppFactory::create();

const JWT_SECRET = "FlorianHUBER123";

function addCorsHeaders (Response $response) : Response {

    $response =  $response
    //->withHeader("Access-Control-Allow-Origin", '*')
    //->withHeader("Access-Control-Allow-Headers" ,'Content-Type,Access-Control-Allow-Origin,access-control-allow-origin')
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    ->withHeader ("Access-Control-Expose-Headers" , 'Authorization');

    return $response;
}


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/signUp", "/api/login", "/hello","/api/hello"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => "Le JWT servant à l'authentification n'est pas valide, veuillez vous reconnecter");
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];


//Inscription d'un utilisateur
$app->post('/api/signUp', function (Request $request, Response $response, $args) {

    global $entityManager;

    $body = json_decode($request->getBody());

    $login = $body->login;
    $password = $body->password;
    $lastname = $body->lastname;
    $firstname = $body->firstname;
    $address = $body->address;
    $zipCode = $body->zipCode;
    $city = $body->city;
    $phoneNumber = $body->phoneNumber;
    $email = $body->email;
    $civility = $body->civility;
    $country = $body->country;

    $userRepository = $entityManager->getRepository('Users');

    $response = addCorsHeaders($response);

    if ($userRepository->findOneBy(array("login" => $login))) 
    {
        $response->getBody()->write(json_encode(array("message" => "Ce nom d'utilisateur est déjà utilisé")));
        return $response->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(409);
    } 

    $user = new Users();
    $user->setLogin($login);
    $user->setPassword($password);
    $user->setLastname($lastname);
    $user->setFirstname($firstname);
    $user->setAddress($address);
    $user->setZipcode($zipCode);
    $user->setCity($city);
    $user->setPhonenumber($phoneNumber);
    $user->setEmail($email);
    $user->setCivility($civility);
    $user->setCountry($country);

    $entityManager->persist($user);
    $entityManager->flush();

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
    $response->getBody()->write(json_encode($user));

    return $response;
});


//Connexion d'un utilisateur avec renvoi d'un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {    

    $issuedAt = time();
    $expirationTime = $issuedAt + 36000;

    $body = json_decode($request->getBody());

    global $entityManager;
    $userRepository = $entityManager->getRepository('Users');

    $user = $userRepository->findOneBy(array("login" => $body->login));

    $response = addCorsHeaders($response);

    if ($user == null)
    {
        $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
        $response->getBody()->write(json_encode(array("message" => "L'utilisateur n'existe pas")));
    
        return $response->withStatus(404);
    }

    $payload = array(
        'userid' => $user->getId(),
        'pseudo' => $user->getLogin(),
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");

    return $response->withHeader("Authorization", "Bearer {$token_jwt}")->withStatus(200);
});


//Récupération de l'entièreté des produits
$app->get('/api/products', function (Request $request, Response $response, $args) {
    
    global $entityManager;

    $productRepository = $entityManager->getRepository('Product');
    $products = $productRepository->findAll();

    $response = addCorsHeaders($response);

    if ($products == null) 
    {
        $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
        $response->getBody()->write(json_encode(array("message" => "Aucun produit n'a été trouvé")));

        return $response->withStatus(404);
    }

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
    $response->getBody()->write(json_encode($products));

    return $response;
});


//Récupération d'un produit d'après un ID donné
$app->get('/api/products/{id}', function (Request $request, Response $response, $args) {
    
    global $entityManager;

    $productRepository = $entityManager->getRepository('Product');
    $product = $productRepository->findOneBy(array("id" => $args["id"]));

    $response = addCorsHeaders($response);

    if ($product == null) 
    {
        $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
        $response->getBody()->write(json_encode(array("message" => "Ce produit n'existe pas")));

        return $response->withStatus(404);
    }

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
    $response->getBody()->write(json_encode($product));

    return $response;
});


//Création d'un produit d'après un payload donné
$app->post('/api/products', function (Request $request, Response $response, $args) {
    
    global $entityManager;

    $productRepository = $entityManager->getRepository('Product');
    $product = $productRepository->findAll();

    $body = json_decode($request->getBody());

    $name = $body->name;
    $description = $body->description;
    $prix = $body->prix;

    $product = new Product($name, $description, $prix);

    $entityManager->persist($product);
    $entityManager->flush();

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8");
    $response->getBody()->write(json_encode($product));

    return addCorsHeaders($response);
});


//Récupération d'un client d'après un ID donné
$app->get('/api/clients/{id}', function (Request $request, Response $response, $args) {

    global $entityManager;

    $userRepository = $entityManager->getRepository('Users');

    $user = $userRepository->findOneBy(array("id" => $args["id"]));

    $response = addCorsHeaders($response);

    if ($user == null) 
    {
        $response->getBody()->write(json_encode(array("message" => "Cet utilisateur n'existe pas")));
        return $response->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(404);
    }

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(200);
    $response->getBody()->write(json_encode($user));
    
    return $response;
});


//S'apparente à une route de test qui renvoie le paramètre saisie après /hello
$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {

    $response = $response->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(200);
    $response->getBody()->write(json_encode (array("message" => "Hello {$args['name']}")));
    
    return $response;
});


// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();