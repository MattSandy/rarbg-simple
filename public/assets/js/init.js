$(document).ready(function(){
   $("form.search-form").submit(function(e){
      window.location.assign("/torrents/" + $("#search").val());
      e.preventDefault();
   });
});