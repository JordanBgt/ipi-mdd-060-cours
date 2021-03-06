
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
    $(block).find('[data-toggle="popover"]').popover({
      container: 'body'
    });
  });

  $("#con-heritage").click(function(event) {
    var text = $(event.target).html();
    if(text === "&nbsp;&nbsp;T"){
      $(event.target).html("&nbsp;&nbsp;X");
      $("#heritage-type").html("Héritage par disjonction. Toutes les occurrences de l'entité mère ne peuvent se trouver que dans aucun ou une seule des entité filles existantes.");
    } else if(text === "&nbsp;&nbsp;X"){
      $(event.target).html("&nbsp;XT");
      $("#heritage-type").html("Héritage par partition. Toutes les occurrences de l'entité mère se trouvent dans une seule des entité filles existantes.");
    } else if(text === "&nbsp;XT"){
      $(event.target).html("&nbsp;&nbsp;T");
      $("#heritage-type").html("Héritage par couverture. Toutes les occurrences de l'entité mère se trouvent dans au moins une des entité filles existantes.");
    }
  });
  
});
var nbSlides = $(".step.slide").length;
var showPopover = new URL(window.location).searchParams.get("showPopover");

var rootElement = document.getElementById( "impress" );

rootElement.addEventListener( "impress:stepenter", function(event) {

  var currentStep = event.target;
  var numeroSlide = $(currentStep).attr("data-nb");
  $("#numSlide").html(numeroSlide);
  var percentageSlide = Math.round(numeroSlide * 100 / nbSlides);
  $("#progress").attr("style", "width: " + percentageSlide + "%;");
  $("#progress").attr("aria-valuenow", percentageSlide);

  if($(currentStep).attr("id") === "introduction-constats"){
    var ctx = document.getElementById("chart1995").getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
          labels: ["Terminé dans les temps et le budget", "Terminé avec dépassement du budgets et/ou des délais", "Abandonné"],
          datasets: [{
              label: 'Réussite des projets informatiques en 1995',
              data: [16,53,31],
              backgroundColor: [
                  '#c3e6cb',
                  '#ffe8a1',
                  '#f5c6cb'
              ],
          }]
      },
      options: {
        responsive: false
      }
    });
    var ctx = document.getElementById("chart2015").getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
          labels: ["Terminé dans les temps et le budget", "Terminé avec dépassement du budgets et/ou des délais", "Abandonné"],
          datasets: [{
              label: 'Réussite des projets informatiques en 2015',
              data: [29,52,19],
              backgroundColor: [
                  '#c3e6cb',
                  '#ffe8a1',
                  '#f5c6cb'
              ],
          }]
      },
      options: {
        responsive: false
      }
    });
  }

  if(showPopover === "true") {
    setTimeout(function(){
      $('#' + currentStep.id + ' [data-toggle="popover"]').popover('show', {
        container: 'body'
      });
  }, 1000);
  } else {
    $('#' + currentStep.id + ' [data-toggle="popover"]').popover({
      container: 'body'
    });
  }

  
});

rootElement.addEventListener( "impress:stepleave", function(event) {

  var currentStep = event.target;
  $('#' + currentStep.id + ' [data-toggle="popover"]').popover('dispose');
});

$(window).on('hashchange', function(e){
    //Gérer dropdown-toggle
    var origEvent = e.originalEvent;
    oldHash = origEvent.oldURL.substring(origEvent.oldURL.lastIndexOf("#")).replace("/","");
    newHash = origEvent.newURL.substring(origEvent.newURL.lastIndexOf("#")).replace("/","");
    $('#my-navbar li a').removeClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.indexOf("-")) + '"]').addClass("active");
    urls = newHash.split("-");
    if(urls.length > 3){
      $('#my-navbar li a[href="' + urls[0] + "-" + urls[1] + '"]').addClass("active");
    } else {
      $('#my-navbar li a[href="' + newHash.substring(0,newHash.lastIndexOf("-")) + '"]').addClass("active");
    }
    $('#my-navbar li a[href="' + newHash + '"]').addClass("active");
    
});

//-------------------
$("div.step.slide").each(function(index, el) {
  var id = $(el).attr("id");
  var title = $(el).find("h1.display-3").text();
  $(el).attr("data-nb", index + 1);
  var yOffset = 1100;
  var xOffset = 2000;
  var ybase = 1100;
  var xbase = 0; 
  if(id !== 'accueil'){
    if(id.indexOf("-") > 0){
      if(id.lastIndexOf("-") != id.indexOf("-")){
        if(id.split("-").length == 4){
          $(el).attr("data-rel-x", xOffset);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-rotate-x", 90);
          $(el).attr("data-z", -2000);
        } else {
          $(el).attr("data-rel-x", 0);
          $(el).attr("data-rel-y", 0);
          $(el).attr("data-z", -2000);
          $(el).attr("data-rotate-x", 90);
        }
      } else {
        var baseId = id.substring(0,id.indexOf("-"));
        console.log(baseId);
        $("div#dropdown-"+baseId).append('<a class="dropdown-item" href="#'+id+'">'+title+'</a>');
        $(el).attr("data-rel-x", xOffset);
        $(el).attr("data-rel-y", 0);
        $(el).attr("data-z", 0);
      }
    } else {
      if($('div[id^="'+id+'-"]').length > 0){
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" id="navbarDropdown'+id+'" href="#'+id+'" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+title+'</a> <div id="dropdown-'+id+'" class="dropdown-menu" aria-labelledby="navbarDropdown'+id+'"></div></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      } else {
        $("ul.nav.nav-pills.mr-auto").append('<li class="nav-item"><a class="nav-link" href="#'+id+'">'+title+'</a></li>');  
        $(el).attr("data-x", 0);
        $(el).attr("data-rel-y", yOffset);
        $(el).attr("data-z", 0);
      }
    }
  }
});

var imp = impress();
imp.init();