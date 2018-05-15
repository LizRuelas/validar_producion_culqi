<?php
header('Content-Type: application/json');
/**
 * Como crear un cargo a una tarjeta usando Culqi PHP.
 */

// Cargar Culqi-PHP de forma manual
  require '../Requests-master/library/Requests.php';
  Requests::register_autoloader();
  require '../lib/culqi.php';

use Culqi\Culqi;
// Configurar tu API Key y autenticación
$SECRET_API_KEY = $_POST["secreta"];
$culqi = new Culqi(array('api_key' => $SECRET_API_KEY));


try {
  // Creando Cargo a una tarjeta
  $charge = $culqi->Charges->create(
      array(
        "amount" => 300,
        "currency_code" =>$_POST["moneda"],
        "email" => $_POST["email"],
        "source_id" => $_POST["token"]
        )
  );
  // Response
  echo json_encode($charge);

} catch (Exception $e) {
  echo json_encode($e->getMessage());
}
