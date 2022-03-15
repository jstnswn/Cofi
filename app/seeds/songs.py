from app.models import db, Song



songs = [
    Song( #1
        title='Long Walk, Short Dock',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/01+Long+Walk%2C+Short+Dock+(ft+Dillan+Witherow).mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png',
        track_number=1
    ),
    Song( #2
        title='Dots',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/02+Dots.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png',
        track_number=2
    ),
    Song( #3
        title='Wildflower',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/03+Wildflower+v2.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png',
        track_number=3
    ),
    Song( #4
        title='Attic',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/04+Attic+(feat.+INKY!)+v2.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png',
        track_number=4
    ),
    Song( #5
        title='I See You In Slow Motion',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/05+I+See+You+In+Slow+Motion+v2.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/afterhours-art.png',
        track_number=5
    ),

    Song( #6
        title='Down The Port',
        user_id=1,
        artist_id=2,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1.Downt_The_port.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png',
        track_number=1
    ),
    Song( #7
        title='Dots',
        user_id=1,
        artist_id=2,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2.Foam.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png',
        track_number=2
    ),
    Song( #8
        title='Wildflower',
        user_id=1,
        artist_id=2,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3.Mareille.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png',
        track_number=3
    ),
    Song( #9
        title='Attic',
        user_id=1,
        artist_id=2,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4.Ociean_Drift.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png',
        track_number=4
    ),
    Song( #10
        title='I See You In Slow Motion',
        user_id=1,
        artist_id=2,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5.That_Old_Beach_House.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/azure-art.png',
        track_number=5
    ),

    Song( #11
        title='Introvert',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/01+Blue+Wednesday+-+Introvert.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png',
        track_number=1
    ),
    Song( #12
        title='Driftwood',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/02+Blue+Wednesday+x+Middle+School+x+Tender+Spring+-+Driftwood.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png',
        track_number=2
    ),
    Song( #13
        title='Japanese Garden',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/03+Blue+Wednesday+-+Japanese+Garden.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png',
        track_number=3
    ),
    Song( #14
        title='Cascadia',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/04+Blue+Wednesday+x+Dillan+Witherow+-+Cascadia.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png',
        track_number=4
    ),
    Song( #15
        title='Youth',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/05+Blue+Wednesday+-+Youth.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/discovery_art.png',
        track_number=5
    ),

    Song( #16
        title='Moon Waltz',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1.+Moon+Waltz.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=1
    ),
    Song( #17
        title='Explorers',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2.+Explorers.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=2
    ),
    Song( #18
        title='Escape With Me',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3.+Escape+With+Me.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=3
    ),
    Song( #19
        title='Our Highway',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4.+Our+Hideaway.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=4
    ),
    Song( #20
        title='Infinite',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5.+Infinite.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=5
    ),
    Song( #21
        title='Midnight Sky',
        user_id=1,
        artist_id=3,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6.+Midnight+Sky.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/escapade.png',
        track_number=6
    ),

    Song( #22
        title='The Descent',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1_The_Descent.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=1
    ),
    Song( #23
        title='Birds Eye View',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2_Birds_Eye_View.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=2
    ),
    Song( #24
        title='Warm Winds',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3_Warm_Winds.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=3
    ),
    Song( #25
        title='Things In Between',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4_Things_In_Between.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=4
    ),
    Song( #26
        title='Rainshadow',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5_Rainshadow.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=5
    ),
    Song( #27
        title='Road Back Home',
        user_id=1,
        artist_id=1,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6_Road_Back_Home.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/in-my-head-art.png',
        track_number=6
    ),

    Song( #28
        title='At Ease',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/at+ease.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=1
    ),
    Song( #29
        title='Balcony Nights',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/balcony+nights+ft.+Spencer+Hunt.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=2
    ),
    Song( #30
        title='Blankets',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/blankets.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=3
    ),
    Song( #31
        title='Dreams of You',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/dreams+of+you.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=4
    ),
    Song( #31
        title='Missing You',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/missing+you.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=5
    ),
    Song( #33
        title='Night Coffee',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/night+coffee+ft.+Mondo+Loops.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=6
    ),
    Song( #34
        title='Snooze',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/snooze+ft.+Jordy+Chandra.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=7
    ),
    Song( #35
        title='Stargazing',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/stargazing.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=8
    ),
    Song( #36
        title='Warm Meadows',
        user_id=1,
        artist_id=4,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/warm+meadows.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/moonglow-art.png',
        track_number=9
    ),

    Song( #37
        title='Noctilucent',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1.Ambulo_x_Squeeda-Noctilucent.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=1
    ),
    Song( #38
        title='Polar',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2.Ambulo-Polar.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=2
    ),
    Song( #39
        title='Sun Dog',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3.Ambulo_x_squeeda-Sun+dog.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=3
    ),
    Song( #40
        title='Resilience',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4.Ambulo_x_mell-o-Resilience.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=4
    ),
    Song( #41
        title='Child',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5.Ambulo-Child.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=5
    ),
    Song( #42
        title='Pleasant',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6.Ambulo_x_Kasper_lindmark-Pleasant.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=6
    ),
    Song( #43
        title='Intentions',
        user_id=1,
        artist_id=5,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/7.Ambulo_x_Kasper_Lindmark-Intentions.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=7
    ),

    Song( #44
        title='Riverside',
        user_id=1,
        artist_id=6,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1.+Riverside+(Master)+(1).mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=1
    ),
    Song( #45
        title='Aftercastle',
        user_id=1,
        artist_id=6,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2.+Aftercastle+(Slo+Loris+x+Strehlow)+(Master).mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=2
    ),
    Song( #46
        title='Kings of Indoors',
        user_id=1,
        artist_id=6,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3.+Kings+of+the+Indoors+(Slo+Loris+x+Tender+Spring+.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=3
    ),
    Song( #47
        title='Lily Fieldwav',
        user_id=1,
        artist_id=6,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4.+Lily+Fieldwav.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=4
    ),
    Song( #48
        title='Pier',
        user_id=1,
        artist_id=6,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5.+Pier+.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/polar_art.png',
        track_number=5
    ),

    Song( #49
        title='Meteor Shower',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1.+Meteor+Shower+ft.+Ambulo%24DrKmnd.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=1
    ),
    Song( #50
        title='Satellite Nights',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2.+Satellite+Nights%24Drkmnd.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=2
    ),
    Song( #51
        title='Pluto',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3.+Pluto+ft.+allem+iversom.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=3
    ),
    Song( #52
        title='Jupiter Jam',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4.+Jupiter+Jam.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=4
    ),
    Song( #53
        title='Signal',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5.+Signal.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=5
    ),
    Song( #54
        title='Last Alive',
        user_id=1,
        artist_id=7,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6.+Last+Alive.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sattelite_nights_art.png',
        track_number=6
    ),

    Song( #55
        title='Sun',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1-sun.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=1
    ),
    Song( #56
        title='Off',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2-off.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=2
    ),
    Song( #57
        title='Cold',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3-cold.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=3
    ),
    Song( #58
        title='Station',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4-station+(master).mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=4
    ),
    Song( #59
        title='Bodies',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5-bodies.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=5
    ),
    Song( #60
        title='Sing',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6-sing.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=6
    ),
    Song( #61
        title='Slow',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/7-slow.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=7
    ),
    Song( #62
        title='Put',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/8-put+(1).mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=8
    ),
    Song( #63
        title='Painting',
        user_id=1,
        artist_id=8,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/9-painting.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/staring_through.png',
        track_number=9
    ),

    Song( #64
        title='Black Cherry',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/1+-+Black+Cherry.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=1
    ),
    Song( #65
        title='Caramellow',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/2+-+Caramellow.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=2
    ),
    Song( #66
        title='Late Night Latte',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/3+-+Late+Night+Latte.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=3
    ),
    Song( #67
        title='Sundae Sunset',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/4+-+Sundae+Sunset.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=4
    ),
    Song( #68
        title='Dark Chocolate',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/5+-+Dark+Chocolate.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=5
    ),
    Song( #69
        title='Sugar Coat',
        user_id=1,
        artist_id=9,
        song_url='https://cofi-bucket.s3.amazonaws.com/song-seeds/6+-+Sugar+Coat.mp3',
        image_url='https://cofi-bucket.s3.amazonaws.com/art-seeds/sweet_dreams_art.png',
        track_number=6
    ),
]

def seed_songs():
    for song in songs:
        db.session.add(song)



    db.session.commit()


def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
