app.directive('videoBrightcove', ['$timeout', function($timeout) {
	return {
		restrict: 'C',
		link: function postLink(scope, element, attrs) {

			scope.$watch('event.brightcoveVideoId', function(){

				var videoTemplate = '<object id="' + attrs.objectId + '" class="BrightcoveExperience"">' +
					'<param name="bgcolor" value="#000000">' +
					'<param name="height" value="360">' +
					'<param name="playerID" value="' + attrs.objectId + '">' +
					'<param name="playerKey" value="AQ~~,AAABFr5dtuk~,GrdDxOUKpFCMyoNW2ER2OZJAjgBWSH9M">' +
					'<param name="isVid" value="true">' +
					'<param name="isUI" value="true">' +
					'<param name="dynamicStreaming" value="true">' +
					'<param name="autoStart" value="false">' +
					'<param name="wmode" value="transparent">' +
					'<param name="dynamicStreaming" value="true" />' +
					'<param name="htmlFallback" value="true" />' +
					'<param name="@videoPlayer" value="' + attrs.videoId + '">';

					if(isSecure()){
						videoTemplate += '<param name="secureConnections" value="true" />' +
							'<param name="secureHTMLConnections" value="true" />';
					}

				videoTemplate += '</object>';

				element.html(videoTemplate);

				return $timeout(function() {
					return brightcove.createExperiences();
				});
			});
		}
	};
}]);