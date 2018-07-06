console.log('js');
const app = angular.module('KoalaApp', []);
app.controller('KoalaController', ['$http', function ($http) {
    console.log('controller works ');
    let self = this;
    self.koalas = [];
    self.addKoala = function (newKoala) {
        console.log('click working');
        $http({
            url: '/koala',
            method: 'POST',
            data: newKoala
        }).then(function (response) {
            console.log('made it to POST', response);
            self.getKoalas();
            self.newKoala.name = '';
            self.newKoala.gender = '';
            self.newKoala.age = '';
            self.newKoala.notes = '';
        }).catch(function (error) {
            console.log('error in POST', error);
        })
    }
    self.getKoalas = function () {
        $http({
            url: '/koala',
            method: 'GET'
        }).then(function (response) {
            console.log('made it to GET', response);
            console.log(response.data);

            self.koalas = response.data
        }).catch(function (error) {
            console.log('error on GET', error);
        })
    }
    self.deleteKoala = function (id) {
        console.log('id of pet to delete', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this koala!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Your koala has been sent to live on a farm", {
                icon: "success",
              });
              $http({
                url: `/koala/${id}`,
                method: 'DELETE'
            }).then(function (response) {
                self.getKoalas();
                console.log(response);
            }).catch(function (error) {
                console.log('error response', error);
            })
            } else {
              swal("Your koala lives to see another day!");
            }
          });
      
    }

    self.readyToTransfer = function(koala){
        $http({
            url: `/koala/${koala._id}`,
            method: 'PUT',
            data: {ready_to_transfer: !koala.ready_to_transfer}
        }).then(function(response){
            console.log('PUT', response);
            self.getKoalas();

        }).catch(function(error){
            console.log('error in PUT', error);
            
        })
      
    } 

    self.getKoalas()
}])