//Подключаем youtube api
var youtube = $('[data-youtube]'), video = [];
if (youtube.length > 0) {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() {
		youtube.each(function(i) {
			var el = $(this);
			//создаем модалку для видео
			var id_f = el.data('youtube').split("#");
				id_f = id_f[1];	
			this.setAttribute("data-toggle", "modal");
			this.setAttribute("data-target", '#video_'+id_f);
			var id_v = $(this).data('target').split("#");
			$('body').append('<div class="modal fade js_video" id="'+id_v[1]+'"><div class="modal-dialog" ><div class="insert_id" id="'+id_f+'"></div><div data-dismiss="modal" class="close_button_popup"></div></div></div>');

    		var videoId = el.attr('href').match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
				v = new YT.Player(el.data('youtube').replace('#',''), {
		            height: '100%',
		            width: '100%',
		            videoId: videoId[6],
		            events: {
		            'onReady': onPlayerReady,
		            }
		        });			
        });
        
    }

	function onPlayerReady(e) {
		var video = e.target,
			modal = $(video.a).parents('.modal');

		if (modal.length > 0) {
			modal.on('shown.bs.modal', function (e) {
				video.playVideo();
			});
			modal.on('hide.bs.modal', function (e) {
				video.pauseVideo();
			});
		}
	}
}