var appModule = angular.module('app', [])
appModule.factory('$processing',['$rootScope','$compile',function($rootScope,$compile){
		var defaultOptions = {
			lines: 13, 
            length: 12,  
            width: 4,   
            radius: 10, 
            corners: 1, 
            rotate: 0, 
            color: 'white', 
            speed: 1, 
            trail: 60, 
            shadow: false, 
            hwaccel: false,
            className: 'spinner', 
            zIndex: 2e9, 
            top: '45%', 
            left: '50%', 
            visibility: true	
		};
		var progress = {			
			id:'',
			compiledElement:'',
			show: function(strText,options){
				//override the default options
				if(options != undefined){				
					defaultOptions.lines = options.lines != undefined ? options.lines : defaultOptions.lines;
					defaultOptions.length = options.length != undefined ? options.length : defaultOptions.length;
					defaultOptions.width = options.width != undefined ? options.width : defaultOptions.width ;
					defaultOptions.radius = options.radius != undefined ? options.radius : defaultOptions.radius;
					defaultOptions.corners = options.corners != undefined ? options.corners : defaultOptions.corners ;				
				}
				 
				var spinner = new Spinner(defaultOptions);				
				var elementString = '<div class="spnnrCntnr"><div class="spnrContent"><span class="LoadingText">'+strText+'</span></div></div>'
				elementString = $compile(elementString)($rootScope);
				compiledElement = angular.element('body').append(elementString);
				var target = angular.element('.spnrContent');
				progress.Id = spinner.spin();
				target.append(spinner.el); 
			},
			hide: function(){
				progress.Id.stop();
				compiledElement.remove();				
			}
		};
		return progress;
	 
}]);

appModule.controller('MainCtrl', ['$scope','$processing',function($scope,processing){
	$scope.startProcessing = function(){
		var objOption = {
			lines: 8,
			length: 10,
			width: 6,
			radius: 10, 
			corners: 1			
		}		
		processing.show('Loading...',objOption);	
	}
	$scope.stopProcessing = function(){
		processing.hide();	
	}
}]);
