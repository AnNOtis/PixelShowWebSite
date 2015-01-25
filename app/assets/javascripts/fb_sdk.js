
window.fbAsyncInit = function() {
  FB.init({
    appId      : '482784788535092',
    xfbml      : true,
    version    : 'v2.1'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
};

function postImageToFacebook( authToken, filename, mimeType, imageData, message )
{
    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    debugger
    xhr.sendAsBinary( formData );
};

function postCanvasToFacebook(dataUrl, filename) {
  var data = dataUrl;
  var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
  var decodedPng = Base64Binary.decode(encodedPng);
  debugger
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") {
      postImageToFacebook(response.authResponse.accessToken, filename, "image/png", decodedPng, "pixelshow.io");
    } else if (response.status === "not_authorized") {
     FB.login(function(response) {
      postImageToFacebook(response.authResponse.accessToken, filename, "image/png", decodedPng, "pixelshow.io");
     }, {scope: "publish_actions"});
    } else {
     FB.login(function(response)  {
      postImageToFacebook(response.authResponse.accessToken, filename, "image/png", decodedPng, "pixelshow.io");
     }, {scope: "publish_actions"});
    }
   });
};