  $(document).ready(function () {
    $('button.content-toggle').click(function () {
      $('.allcontents').show()
      $('.allstats').hide()
    })

    $('button.stats-toggle').on('click', function () {
      $('.allcontents').hide()
      $('.allstats').show()
    })
  })


