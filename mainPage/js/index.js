function run(){
  var url = "http://picfind.herokuapp.com/api/imagesearch/";
  url += encodeURI($("#terms").val());
 
  url += "?offset=" + $("#offset").val();
   console.log(url);
  location.href = url;
}

function log(){
  location.href = "http://picfind.herokuapp.com/api/latest/imagesearch";
}