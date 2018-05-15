var moneda;
$("#response-panel").hide();
$("#response-panel-1").hide();
$('#miBoton').on('click', function (e) {
    // Abre el formulario con las opciones de Culqi.settings
    if ($('#currency_code').is(":checked"))
      {
        console.log("soles");
        moneda = "PEN";
      } else {
        console.log("dolares");
        moneda = "USD";
      }
    Culqi.publicKey = $("#publica").val();
    Culqi.settings({
      title: 'Culqi Store',
      currency: moneda,
      description: 'Polo/remera Culqi lover',
      amount: 300
     });
    Culqi.open();
    e.preventDefault();
});
// Recibimos Token del Culqi.js
  function culqi() {
    var secreta = $("#secreta").val();
    if (Culqi.token) {
        $(document).ajaxStart(function(){
          run_waitMe();
        });
        // Imprimir Token
        $.ajax({
           type: 'POST',
           url: '../culqi-php-develop/examples/02-create-charge.php',
           data: { token: Culqi.token.id , moneda , secreta },
           datatype: 'json',
           success: function(data) {
             var result = "";
             if(data.constructor == String){
                 result = JSON.parse(data);
             }
             if(data.constructor == Object){
                 result = JSON.parse(JSON.stringify(data));
             }
             if(result.object === 'charge'){
                resultdiv(result.outcome.merchant_message);
                resultdiv1(result.outcome.user_message);
             }
             if(result.object === 'error'){
                resultdiv(result.merchant_message);
                resultdiv1(result.user_message);
             }
           },
           error: function(error) {
             resultdiv(error)
           }
        });
    } else {
      // Hubo un problema...
      // Mostramos JSON de objeto error en consola
      $('#response-panel').show();
      $('#response').html(Culqi.error.merchant_message);
      $('body').waitMe('hide');
    }
  };
  function run_waitMe(){
    $('body').waitMe({
      effect: 'orbit',
      text: 'VALIDACIÓN DE COMERCIO EN PRODUCCIÓN...',
      bg: 'rgba(255,255,255,0.7)',
      color:'#FF0000'
    });
  }
  function resultdiv(message){
    $('#response-panel').show();
    $('#response').html(message);
    $('body').waitMe('hide');
  }

  function resultdiv1(message1){
    $('#response-panel-1').show();
    $('#response-1').html(message1);
    $('body').waitMe('hide');
  }
