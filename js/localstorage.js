/////////////////////////localstorage pour ajouter le nom et prènom///////////////////////

jQuery(function ($) {

  $.fn.formBackUp = function () {
    if (!(localStorage)) {
        return false;
    }
    var forms = this;
    var datas = {};
    var ls = false;
    datas.href = window.location.href;
    //localStorage.removeItem('formBackUp');
    

    //On recupure les infos du localstorage
    
    if (localStorage['formBackUp']) {
        ls = JSON.parse(localStorage['formBackUp']);
        if(ls.href == datas.href){
            for (var id in ls ){
                if (id != 'href') {
                    $('#'+id).val(ls[id]);
                    console.log('bonjour');
                    datas[id]=ls[id];
                }
            }
        }

    }

    $( "#res-name" ).keyup(function (e) {
        //console.log('test');
      datas[$(this).attr('id')] = $(this).val();
      localStorage.setItem('formBackUp', JSON.stringify(datas));
    });
     $( "#res-lastName" ).keyup(function (e) {
        //console.log('test');
      datas[$(this).attr('id')] = $(this).val();
      localStorage.setItem('formBackUp', JSON.stringify(datas));
    });
    //console.log(localStorage);
  }

  $('form').formBackUp();

});

///////////////////fin jquery/////////////////////////////////