<?php

// 定義變數
$group_number    = $_POST['group_number'] ? $_POST['group_number'] : '1';
$password_length = $_POST['password_length'] ? $_POST['password_length'] : '1';
$have_number     = $_POST['have_number'] ? true : false;
$have_upper      = $_POST['have_upper'] ? true : false;
$have_lower      = $_POST['have_lower'] ? true : false;
$have_symbol     = $_POST['have_symbol'] ? true : false;
$no_similarity   = $_POST['no_similarity'] ? true : false;
$password_group  = '';
$results         = array();

// 處理密碼字元
if ($have_number) {
    $password_group .= '0123456789';
}
if ($have_upper) {
    $password_group .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}
if ($have_lower) {
    $password_group .= 'abcdefghijklmnopqrstuvwxyz';
}
if ($have_symbol) {
    $password_group .= '!@#$%^&*';
}
if ($no_similarity) {
    $password_group = str_replace('!', '', $password_group);
    $password_group = str_replace('1', '', $password_group);
    $password_group = str_replace('l', '', $password_group);
    $password_group = str_replace('I', '', $password_group);
    $password_group = str_replace('o', '', $password_group);
    $password_group = str_replace('O', '', $password_group);
    $password_group = str_replace('0', '', $password_group);
}

$group_length = strlen($password_group);

for ($i = 0; $i < $group_number; $i++) {
    $result = '';
    for ($j = 0; $j < $password_length; $j++) {
        $rand = rand(0, $group_length-1);
        $result .= substr($password_group, $rand,1);
    }
    $results[$i] = $result;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>密碼產生器</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-theme.min.css">
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="page-header">
      <h1>密碼產生器 <small>Generate Password</small></h1>
    </div>
    <form class="form-horizontal" role="form" method="POST" action="index.php">
        <div class="form-group form-group-sm">
            <label for="group_number" class="col-sm-2 control-label">組數：</label>
            <div class="col-sm-2">
                <input type="number" name="group_number" class="form-control" id="group_number" placeholder="組數" min="1">
            </div>
        </div>
        <div class="form-group form-group-sm">
            <label for="password_length" class="col-sm-2 control-label">長度：</label>
            <div class="col-sm-2">
                <input type="number" name="password_length" class="form-control" id="password_length" placeholder="長度" min='1'>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-10">
                <hr>
            </div>
        </div>
        <div class="form-group form-group-sm">
            <label for="have_number" class="col-sm-2 control-label">數字：</label>
            <div class="checkbox col-sm-10">
                <label>
                    <input id="have_number" name="have_number" type="checkbox">（0123456789）
                </label>
            </div>
            <label for="have_upper" class="col-sm-2 control-label">大寫字母：</label>
            <div class="checkbox col-sm-10">
                <label>
                    <input id="have_upper" name="have_upper" type="checkbox">（ABCDEFGHIJKLMNOPQRSTUVWXYZ）
                </label>
            </div>
            <label for="have_lower" class="col-sm-2 control-label">小寫字母：</label>
            <div class="checkbox col-sm-10">
                <label>
                    <input id="have_lower" name="have_lower" type="checkbox">（abcdefghijklmnopqrstuvwxyz）
                </label>
            </div>
            <label for="have_symbol" class="col-sm-2 control-label">特殊字元：</label>
            <div class="checkbox col-sm-10">
                <label>
                    <input id="have_symbol" name="have_symbol" type="checkbox">（!@#$%^&*）
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-10">
                <hr>
            </div>
        </div>
        <div class="form-group form-group-sm">
            <label for="no_similarity" class="col-sm-2 control-label">去除相似字型：</label>
            <div class="checkbox col-sm-10">
                <label>
                    <input id="no_similarity" name="no_similarity" type="checkbox">（!.1.l.I.o.O.0）
                </label>
            </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default btn-xs">產生</button>
          </div>
        </div>
    </form>
    <div class="row">
        <?php foreach ($results as $key => $value):?>
            <div class="col-sm-offset-1 col-sm-10">
                <p><?php echo $value ?></p>
            </div>
        <?php endforeach ?>
    </div>
</div>
</body>
</html>