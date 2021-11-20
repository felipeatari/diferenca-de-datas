<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: *');

define("DATE_BR", "d/m/Y H:i:s");

$request = file_get_contents("php://input");
$dados = json_decode($request, true);

$d = !empty($dados['d']) ? $dados['d'] : '00';
$m = !empty($dados['m']) ? $dados['m'] : '00';
$a = !empty($dados['a']) ? $dados['a'] : '0000';

$dataAtual = new DateTime("now");
$dataUser = new DateTime("{$a}-{$m}-{$d}");

$diff = $dataAtual->diff($dataUser);

try {
    if ($diff->invert) {
        $dia = ($diff->days > 1) ? 'dias' : 'dia';
        $mes = ($diff->m > 1) ? 'meses' : 'mês';
        $ano = ($diff->y > 1) ? 'anos' : 'ano';
        throw new \Exception("Foi a <strong>{$diff->days}</strong> {$dia},<br> <strong>{$diff->m}</strong> {$mes} e <strong>{$diff->y}</strong> {$ano}.");
    } else {
        $dia = ($diff->days > 1) ? 'dias' : 'dia';
        $mes = ($diff->m > 1) ? 'meses' : 'mês';
        $ano = ($diff->y > 1) ? 'anos' : 'ano';
        throw new \Exception("Será em <strong>{$diff->days}</strong> {$dia}, <strong>{$diff->m}</strong> {$mes} e <strong>{$diff->y}</strong> {$ano}.");
    }
} catch (\Exception $e) {
    $json = [
        ['message' => $e->getMessage()]
    ];
    print_r(json_encode($json));
}
