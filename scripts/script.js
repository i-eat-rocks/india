$(function () {
    // Adding event listeners
    $('#numChannels').on('input', function () {
        rebuildBubbles($(this).val());
    });
    $('#toggleSwitch').on('input', function () {
        setResizable($(this).prop('checked'));
    });
    rebuildBubbles($('#numChannels').val());
});

function rebuildBubbles(x) {
    $('#numChannelsVal').html(x);
    $('.bubble-container').remove();

    const container = $('<div class="bubble-container"></div>');

    for (let i = 1; i <= x; i++) {
        container.append(
            `<a href="#" class="bubble"
            style="background-image:url(https://picsum.photos/${49 + i});"
            ></a>`
        );
    }

    $('.scrolling-column').append(container);
}

function setResizable(toggled) {
    // AAAAAAAAAAAAAAAAAAAA
    // completely breaks if the number of bubbles is not divisble by the number of columns
    if (toggled) {
        $('#textBelowSwitch').css("display", "flex");

        $('.scrolling-column').resizable({
            handles: 'e',
            maxWidth: '240',
            start: function (event, ui) {
                // Store the bubble width
                $(this).data('BubbleWidth', $('.bubble').outerWidth());
            },
            resize: function (event, ui) {
                const containerWidth = ui.size.width;
                const numColumns = Math.floor(containerWidth / $(this).data('BubbleWidth'));
                $('.bubble-container').css('column-count', numColumns);
            }
        });
    } else {
        $('#textBelowSwitch').css("display", "none");

        // Remove resizable functionality
        $('.scrolling-column').resizable('destroy');
        
        // Reset the column count to 1
        $('.bubble-container').css('column-count', 1);
    }
}
