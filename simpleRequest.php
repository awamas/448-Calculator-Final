
<?php
//Code adapted from Wolfram API PHP binding
//IN PROGRESS
include '/wa_wrapper/WolframAlphaEngine.php';
?>
        <form method='POST' action='#'>
            Search:
            <input type="text" name="q" value="
            <?php
            $queryIsSet = isset($_REQUEST['q']);
            if ($queryIsSet) {
                echo $_REQUEST['q'];
            }
            ;?>">&nbsp;&nbsp;
            <input type="submit" name="Search" value="Search">
        </form>
        <br><br>
        <hr>
<?php
$appID = 'VP7HK2-G4579PUA3U';

if (!$queryIsSet)
    die();

$qArgs = array();
if (isset($_REQUEST['assumption']))
    $qArgs['assumption'] = $_REQUEST['assumption'];

// instantiate an engine object with your app id
$engine = new WolframAlphaEngine($appID);

// we will construct a basic query to the api with the input 'pi'
// only the bare minimum will be used
$response = $engine->getResults($_REQUEST['q'], $qArgs);

// getResults will send back a WAResponse object
// this object has a parsed version of the wolfram alpha response
// as well as the raw xml ($response->rawXML)

// we can check if there was an error from the response object
if ($response->isError()) {
?>
  <h1>There was an error in the request</h1>
<?php
    die();
}
?>

<h1>Results</h1>
<br>

<hr>

<?php
// if there are any pods, display them
if (count($response->getPods()) > 0) {
?>
    <h2>Pods</h2>
    <table border=1 width="80%" align="center">
<?php
    foreach ($response->getPods() as $pod) {
?>
      <tr>
        <td>
          <h3><?php
        echo $pod->attributes['title'];
?></h3>
<?php
        // each pod can contain multiple sub pods but must have at least one
        foreach ($pod->getSubpods() as $subpod) {
            // if format is an image, the subpod will contain a WAImage object
?>
          <img src="<?php
            echo $subpod->image->attributes['src'];
?>">
          <hr>
<?php
        }
?>

        </td>
      </tr>
<?php
    }
?>
    </table>
<?php
}
?>
