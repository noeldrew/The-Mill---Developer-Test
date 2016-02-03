var VideoHandler = (function () {
	var instance, videos;

	function createInstance(options) {
		var search = new VideoHandler(options);
		return search;
	}

	function VideoHandler() {
		$.ajax({
			dataType: 'json',
			url: 'videos.json',
			success: function (data) {
				videos = data.videos;
				$('.video-thumbnail').each(function (index, el) {
					var thumbnail = document.createElement('img');
					thumbnail.src = videos[index].thumbUrl;
					el.appendChild(thumbnail);
					el.dataset.id = videos[index].id;
					if (index === 0) {
						$(el).addClass('playing');
					}

					$(el).click(function (event) {
						if (!$(event.currentTarget).hasClass('playing')) {
							$('#video-display').css({
								background: '#000'
							});
							var videoId = event.currentTarget.dataset.id;
							loadPlayer(videoId, true);
							updateCopy(index);
							$('.video-thumbnail').removeClass('playing');
							$(event.currentTarget).addClass('playing');
						}

					});
					$(el).delay(index * 200).animate({
						opacity: 1
					}, 500);
				});
				$("#video-display").animate({
					opacity: 1
				}, 900);
				loadPlayer(videos[0].id);
				updateCopy(0);
			}
		});

		return;
	}

	function loadPlayer(videoId, autoplay) {
		var srcUrl = 'https://player.vimeo.com/video/' + videoId,
			playerContainer = document.getElementById('video-display'),
			player = document.createElement('iframe');

		if (autoplay === true) {
			srcUrl += '?autoplay=1';
		}

		player.src = srcUrl;
		playerContainer.innerHTML = "";
		playerContainer.appendChild(player);
	}

	function updateCopy(index) {
		var titleContainer = $('#video-title'),
			descriptionContainer = $('#video-description p');

		$(".text-container").animate({
			opacity: 0
		}, 500, function () {
			titleContainer.html(videos[index].title);
			descriptionContainer.html(videos[index].description);
			$(".text-container").animate({
				opacity: 1
			}, 500);
		});



	}

	return {
		init: function (options) {
			if (!instance) {
				instance = createInstance(options);
			}
			return instance;
		}
	};

})();