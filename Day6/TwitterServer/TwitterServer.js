var routingModule = require("./RoutingModule")
var route = routingModule()
var consolidate  = require("consolidate")
var url = require('url')
var fs = require('fs')

var twitter = require('twitter')
var tweet = new twitter({
    consumer_key: 'xxxx',
    consumer_secret: 'xxxx',
    access_token_key: 'xxxx',
    access_token_secret: 'xxxx'
})

// this uses the local cached data
route.get("/", function(request, response) {
    consolidate.swig("public/index.html", {tweets: sampleTweetData}, function(err, html) {
        response.end(html)
    })
})

// this requests new tweets from twitter server
route.get("/new-data", function(request, response) {
    var cb = function(error, tweets, res) {
        consolidate.swig("public/index.html", {tweets: tweets}, function(err, html) {
            response.end(html)
        })
    }
    tweet.get("/statuses/home_timeline.json?count=50", {}, cb)
})

route.get("/tweet/single", function(request, response) {
    var queryString = url.parse(request.url, true, true)

    var cb = function(error, tweet, res) {
        console.log(tweet);

        consolidate.swig("public/single.html", {tweet: tweet}, function(err, html) {
            response.end(html)
            console.log(err);
        })
    }
    tweet.get("https://api.twitter.com/1.1/statuses/show.json?id=" + queryString.query.tweet_id, {}, cb)
})

route.get("/style.css", function(request, response) {
    response.writeHead(200, {"Content-Type" : "text/css"})
    fs.readFile("public/style.css", function(err, data) {
        response.end(data)
    })
})

route.listen(1234)

var sampleTweetData = [
    {
        "created_at": "Mon Jun 20 00:48:33 +0000 2016",
        "id": 744693385567445000,
        "id_str": "744693385567444992",
        "text": "Good morning, twitter!",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": []
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 42007871,
            "id_str": "42007871",
            "name": "polyonyx",
            "screen_name": "polyonyx",
            "location": "",
            "description": "",
            "url": null,
            "entities": {
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 4,
            "friends_count": 12,
            "listed_count": 0,
            "created_at": "Sat May 23 10:37:38 +0000 2009",
            "favourites_count": 0,
            "utc_offset": null,
            "time_zone": null,
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 122,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "1A1B1F",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png",
            "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png",
            "profile_link_color": "00FF0D",
            "profile_sidebar_border_color": "181A1E",
            "profile_sidebar_fill_color": "252429",
            "profile_text_color": "FF0004",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": true,
            "following": false,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Fri Jun 17 03:39:05 +0000 2016",
        "id": 743649136835072000,
        "id_str": "743649136835072000",
        "text": "Congrats @ussoccer! See you in Houston! #CopaAmerica",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "CopaAmerica",
                    "indices": [
                        40,
                        52
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "ussoccer",
                    "name": "U.S. Soccer",
                    "id": 7563792,
                    "id_str": "7563792",
                    "indices": [
                        9,
                        18
                    ]
                }
            ],
            "urls": []
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 8,
        "favorite_count": 27,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Thu Jun 16 21:04:56 +0000 2016",
        "id": 743549946335367200,
        "id_str": "743549946335367168",
        "text": "Seven new items debut atÂ Pricebenders! https://t.co/a3EDvZgK25 https://t.co/WLdD1PzL6B",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/a3EDvZgK25",
                    "expanded_url": "http://news.sfimg.com/2016/06/16/seven-new-items-debut-at-pricebenders",
                    "display_url": "news.sfimg.com/2016/06/16/sevâ€¦",
                    "indices": [
                        39,
                        62
                    ]
                }
            ],
            "media": [
                {
                    "id": 743549942803767300,
                    "id_str": "743549942803767296",
                    "indices": [
                        63,
                        86
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClGeu8WUoAA-2vs.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClGeu8WUoAA-2vs.jpg",
                    "url": "https://t.co/WLdD1PzL6B",
                    "display_url": "pic.twitter.com/WLdD1PzL6B",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743549946335367168/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "large": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 743549942803767300,
                    "id_str": "743549942803767296",
                    "indices": [
                        63,
                        86
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClGeu8WUoAA-2vs.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClGeu8WUoAA-2vs.jpg",
                    "url": "https://t.co/WLdD1PzL6B",
                    "display_url": "pic.twitter.com/WLdD1PzL6B",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743549946335367168/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "large": {
                            "w": 660,
                            "h": 408,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 8,
        "favorite_count": 31,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Thu Jun 16 20:12:28 +0000 2016",
        "id": 743536744272822300,
        "id_str": "743536744272822272",
        "text": "31,905 free VP awarded in latest Spin &amp;Â Win https://t.co/ojbTi1QxAn https://t.co/nAjN6OftTP",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/ojbTi1QxAn",
                    "expanded_url": "http://news.sfimg.com/2016/06/16/31905-free-vp-awarded-in-latest-spin-win",
                    "display_url": "news.sfimg.com/2016/06/16/319â€¦",
                    "indices": [
                        48,
                        71
                    ]
                }
            ],
            "media": [
                {
                    "id": 743536740619554800,
                    "id_str": "743536740619554816",
                    "indices": [
                        72,
                        95
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClGSueYUkAACRdj.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClGSueYUkAACRdj.jpg",
                    "url": "https://t.co/nAjN6OftTP",
                    "display_url": "pic.twitter.com/nAjN6OftTP",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743536744272822272/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "large": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 743536740619554800,
                    "id_str": "743536740619554816",
                    "indices": [
                        72,
                        95
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClGSueYUkAACRdj.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClGSueYUkAACRdj.jpg",
                    "url": "https://t.co/nAjN6OftTP",
                    "display_url": "pic.twitter.com/nAjN6OftTP",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743536744272822272/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "large": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 324,
                            "h": 500,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 4,
        "favorite_count": 25,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Wed Jun 15 18:14:33 +0000 2016",
        "id": 743144678883631100,
        "id_str": "743144678883631104",
        "text": "Mayâ€™s UNSTOPPABLE affiliates! https://t.co/qXr9cwbzoS https://t.co/E1pWKmpMxr",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/qXr9cwbzoS",
                    "expanded_url": "http://news.sfimg.com/2016/06/15/mays-unstoppable-affiliates",
                    "display_url": "news.sfimg.com/2016/06/15/mayâ€¦",
                    "indices": [
                        30,
                        53
                    ]
                }
            ],
            "media": [
                {
                    "id": 743144675674972200,
                    "id_str": "743144675674972161",
                    "indices": [
                        54,
                        77
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClAuJSpUYAEHH6c.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClAuJSpUYAEHH6c.jpg",
                    "url": "https://t.co/E1pWKmpMxr",
                    "display_url": "pic.twitter.com/E1pWKmpMxr",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743144678883631104/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 743144675674972200,
                    "id_str": "743144675674972161",
                    "indices": [
                        54,
                        77
                    ],
                    "media_url": "http://pbs.twimg.com/media/ClAuJSpUYAEHH6c.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/ClAuJSpUYAEHH6c.jpg",
                    "url": "https://t.co/E1pWKmpMxr",
                    "display_url": "pic.twitter.com/E1pWKmpMxr",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/743144678883631104/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 500,
                            "h": 382,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 10,
        "favorite_count": 37,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Tue Jun 14 14:18:35 +0000 2016",
        "id": 742722911690100700,
        "id_str": "742722911690100737",
        "text": "Did you get your free TCredits thisÂ month? https://t.co/P8QvfdwM41",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/P8QvfdwM41",
                    "expanded_url": "http://news.sfimg.com/2016/06/14/did-you-get-your-free-tcredits-this-month-22",
                    "display_url": "news.sfimg.com/2016/06/14/didâ€¦",
                    "indices": [
                        43,
                        66
                    ]
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 12,
        "favorite_count": 37,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Tue Jun 14 09:18:18 +0000 2016",
        "id": 742647342243979300,
        "id_str": "742647342243979264",
        "text": "one person unfollowed me // automatically checked by https://t.co/QPcvJXqLDq",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/QPcvJXqLDq",
                    "expanded_url": "http://fllwrs.com",
                    "display_url": "fllwrs.com",
                    "indices": [
                        53,
                        76
                    ]
                }
            ]
        },
        "source": "<a href=\"http://fllwrs.com\" rel=\"nofollow\">fllwrs</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 82299507,
            "id_str": "82299507",
            "name": "annisa",
            "screen_name": "auuah",
            "location": "Semarang Timur, Indonesia",
            "description": "analyst at chemistry laboratory",
            "url": "https://t.co/mWckGAgP6c",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/mWckGAgP6c",
                            "expanded_url": "https://twitter.com/auuah",
                            "display_url": "twitter.com/auuah",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1014,
            "friends_count": 307,
            "listed_count": 3,
            "created_at": "Wed Oct 14 07:13:56 +0000 2009",
            "favourites_count": 142,
            "utc_offset": 25200,
            "time_zone": "Jakarta",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 1715,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "000000",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/378800000123374253/c9fd6c00c54c937ce54f4dd31438fdfe.jpeg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/378800000123374253/c9fd6c00c54c937ce54f4dd31438fdfe.jpeg",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/711557584172363776/fxBPoK-O_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/711557584172363776/fxBPoK-O_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/82299507/1445340784",
            "profile_link_color": "FF0000",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "26C50A",
            "profile_text_color": "4EF830",
            "profile_use_background_image": false,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Mon Jun 13 01:16:21 +0000 2016",
        "id": 742163665579741200,
        "id_str": "742163665579741186",
        "text": "This week Central Philippine University, web #infosec and #nodejs. #iloilo #learnnodejs https://t.co/2NzvECv3ZK",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "infosec",
                    "indices": [
                        45,
                        53
                    ]
                },
                {
                    "text": "nodejs",
                    "indices": [
                        58,
                        65
                    ]
                },
                {
                    "text": "iloilo",
                    "indices": [
                        67,
                        74
                    ]
                },
                {
                    "text": "learnnodejs",
                    "indices": [
                        75,
                        87
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [],
            "urls": [],
            "media": [
                {
                    "id": 742163662597554200,
                    "id_str": "742163662597554176",
                    "indices": [
                        88,
                        111
                    ],
                    "media_url": "http://pbs.twimg.com/media/Ckyx60JUgAAhXMd.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Ckyx60JUgAAhXMd.jpg",
                    "url": "https://t.co/2NzvECv3ZK",
                    "display_url": "pic.twitter.com/2NzvECv3ZK",
                    "expanded_url": "http://twitter.com/markkukero/status/742163665579741186/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 680,
                            "h": 510,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1024,
                            "h": 768,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 768,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 742163662597554200,
                    "id_str": "742163662597554176",
                    "indices": [
                        88,
                        111
                    ],
                    "media_url": "http://pbs.twimg.com/media/Ckyx60JUgAAhXMd.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Ckyx60JUgAAhXMd.jpg",
                    "url": "https://t.co/2NzvECv3ZK",
                    "display_url": "pic.twitter.com/2NzvECv3ZK",
                    "expanded_url": "http://twitter.com/markkukero/status/742163665579741186/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 680,
                            "h": 510,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1024,
                            "h": 768,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 768,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 16411983,
            "id_str": "16411983",
            "name": "Markku Kero",
            "screen_name": "markkukero",
            "location": "",
            "description": "@eqela and @EmergeTrainings",
            "url": "http://t.co/wVnb7Ynk40",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/wVnb7Ynk40",
                            "expanded_url": "http://www.markkukero.com",
                            "display_url": "markkukero.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 205,
            "friends_count": 188,
            "listed_count": 12,
            "created_at": "Mon Sep 22 23:30:42 +0000 2008",
            "favourites_count": 7,
            "utc_offset": 28800,
            "time_zone": "Singapore",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 116,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "C0DEED",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/16411983/1453675453",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 14,
        "favorite_count": 14,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sun Jun 12 15:23:36 +0000 2016",
        "id": 742014495896129500,
        "id_str": "742014495896129536",
        "text": "Our hearts go out to the victims and families of the #PulseNightclub tragedy. ðŸ˜­â¤ðŸŒˆâ¤ðŸ˜­",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "PulseNightclub",
                    "indices": [
                        53,
                        68
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [],
            "urls": []
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 56,
        "favorite_count": 98,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Sun Jun 12 02:33:59 +0000 2016",
        "id": 741820817260974100,
        "id_str": "741820817260974083",
        "text": "Congrats PH R18 first ever #dotnet Core #csharp training ppl. Work hard, don't quit, trust God #developtheimpossible https://t.co/h4ZKqCT2Kn",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "dotnet",
                    "indices": [
                        27,
                        34
                    ]
                },
                {
                    "text": "csharp",
                    "indices": [
                        40,
                        47
                    ]
                },
                {
                    "text": "developtheimpossible",
                    "indices": [
                        95,
                        116
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [],
            "urls": [],
            "media": [
                {
                    "id": 741820812789829600,
                    "id_str": "741820812789829632",
                    "indices": [
                        117,
                        140
                    ],
                    "media_url": "http://pbs.twimg.com/media/Ckt6GVFUUAAD0Kf.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Ckt6GVFUUAAD0Kf.jpg",
                    "url": "https://t.co/h4ZKqCT2Kn",
                    "display_url": "pic.twitter.com/h4ZKqCT2Kn",
                    "expanded_url": "http://twitter.com/markkukero/status/741820817260974083/photo/1",
                    "type": "photo",
                    "sizes": {
                        "medium": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 340,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 741820812789829600,
                    "id_str": "741820812789829632",
                    "indices": [
                        117,
                        140
                    ],
                    "media_url": "http://pbs.twimg.com/media/Ckt6GVFUUAAD0Kf.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/Ckt6GVFUUAAD0Kf.jpg",
                    "url": "https://t.co/h4ZKqCT2Kn",
                    "display_url": "pic.twitter.com/h4ZKqCT2Kn",
                    "expanded_url": "http://twitter.com/markkukero/status/741820817260974083/photo/1",
                    "type": "photo",
                    "sizes": {
                        "medium": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 340,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 16411983,
            "id_str": "16411983",
            "name": "Markku Kero",
            "screen_name": "markkukero",
            "location": "",
            "description": "@eqela and @EmergeTrainings",
            "url": "http://t.co/wVnb7Ynk40",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/wVnb7Ynk40",
                            "expanded_url": "http://www.markkukero.com",
                            "display_url": "markkukero.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 205,
            "friends_count": 188,
            "listed_count": 12,
            "created_at": "Mon Sep 22 23:30:42 +0000 2008",
            "favourites_count": 7,
            "utc_offset": 28800,
            "time_zone": "Singapore",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 116,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "C0DEED",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/16411983/1453675453",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 2,
        "favorite_count": 6,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sun Jun 12 01:00:54 +0000 2016",
        "id": 741797389732716500,
        "id_str": "741797389732716544",
        "text": "RT @ussoccer: FINAL! The #USMNT holds on to secure its place in the #CopaAmerica Quarterfinals! #USAvPAR https://t.co/l0X53OnfEm",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "USMNT",
                    "indices": [
                        25,
                        31
                    ]
                },
                {
                    "text": "CopaAmerica",
                    "indices": [
                        68,
                        80
                    ]
                },
                {
                    "text": "USAvPAR",
                    "indices": [
                        96,
                        104
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "ussoccer",
                    "name": "U.S. Soccer",
                    "id": 7563792,
                    "id_str": "7563792",
                    "indices": [
                        3,
                        12
                    ]
                }
            ],
            "urls": [],
            "media": [
                {
                    "id": 741796835124088800,
                    "id_str": "741796835124088833",
                    "indices": [
                        105,
                        128
                    ],
                    "media_url": "http://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                    "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                    "url": "https://t.co/l0X53OnfEm",
                    "display_url": "pic.twitter.com/l0X53OnfEm",
                    "expanded_url": "http://twitter.com/ussoccer/status/741796900458893313/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 600,
                            "h": 300,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 340,
                            "h": 170,
                            "resize": "fit"
                        }
                    },
                    "source_status_id": 741796900458893300,
                    "source_status_id_str": "741796900458893313",
                    "source_user_id": 7563792,
                    "source_user_id_str": "7563792"
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 741796835124088800,
                    "id_str": "741796835124088833",
                    "indices": [
                        105,
                        128
                    ],
                    "media_url": "http://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                    "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                    "url": "https://t.co/l0X53OnfEm",
                    "display_url": "pic.twitter.com/l0X53OnfEm",
                    "expanded_url": "http://twitter.com/ussoccer/status/741796900458893313/photo/1",
                    "type": "animated_gif",
                    "sizes": {
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 600,
                            "h": 300,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 340,
                            "h": 170,
                            "resize": "fit"
                        }
                    },
                    "source_status_id": 741796900458893300,
                    "source_status_id_str": "741796900458893313",
                    "source_user_id": 7563792,
                    "source_user_id_str": "7563792",
                    "video_info": {
                        "aspect_ratio": [
                            2,
                            1
                        ],
                        "variants": [
                            {
                                "bitrate": 0,
                                "content_type": "video/mp4",
                                "url": "https://pbs.twimg.com/tweet_video/CktkSpUUkAER8ZH.mp4"
                            }
                        ]
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweeted_status": {
            "created_at": "Sun Jun 12 00:58:57 +0000 2016",
            "id": 741796900458893300,
            "id_str": "741796900458893313",
            "text": "FINAL! The #USMNT holds on to secure its place in the #CopaAmerica Quarterfinals! #USAvPAR https://t.co/l0X53OnfEm",
            "truncated": false,
            "entities": {
                "hashtags": [
                    {
                        "text": "USMNT",
                        "indices": [
                            11,
                            17
                        ]
                    },
                    {
                        "text": "CopaAmerica",
                        "indices": [
                            54,
                            66
                        ]
                    },
                    {
                        "text": "USAvPAR",
                        "indices": [
                            82,
                            90
                        ]
                    }
                ],
                "symbols": [],
                "user_mentions": [],
                "urls": [],
                "media": [
                    {
                        "id": 741796835124088800,
                        "id_str": "741796835124088833",
                        "indices": [
                            91,
                            114
                        ],
                        "media_url": "http://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                        "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                        "url": "https://t.co/l0X53OnfEm",
                        "display_url": "pic.twitter.com/l0X53OnfEm",
                        "expanded_url": "http://twitter.com/ussoccer/status/741796900458893313/photo/1",
                        "type": "photo",
                        "sizes": {
                            "large": {
                                "w": 1024,
                                "h": 512,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 600,
                                "h": 300,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 340,
                                "h": 170,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "extended_entities": {
                "media": [
                    {
                        "id": 741796835124088800,
                        "id_str": "741796835124088833",
                        "indices": [
                            91,
                            114
                        ],
                        "media_url": "http://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                        "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CktkSpUUkAER8ZH.jpg",
                        "url": "https://t.co/l0X53OnfEm",
                        "display_url": "pic.twitter.com/l0X53OnfEm",
                        "expanded_url": "http://twitter.com/ussoccer/status/741796900458893313/photo/1",
                        "type": "animated_gif",
                        "sizes": {
                            "large": {
                                "w": 1024,
                                "h": 512,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 600,
                                "h": 300,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 340,
                                "h": 170,
                                "resize": "fit"
                            }
                        },
                        "video_info": {
                            "aspect_ratio": [
                                2,
                                1
                            ],
                            "variants": [
                                {
                                    "bitrate": 0,
                                    "content_type": "video/mp4",
                                    "url": "https://pbs.twimg.com/tweet_video/CktkSpUUkAER8ZH.mp4"
                                }
                            ]
                        }
                    }
                ]
            },
            "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 7563792,
                "id_str": "7563792",
                "name": "U.S. Soccer",
                "screen_name": "ussoccer",
                "location": "United States",
                "description": "U.S. Soccer's official feed for the #USMNT.",
                "url": "https://t.co/X2BtwrodVW",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "https://t.co/X2BtwrodVW",
                                "expanded_url": "http://www.ussoccer.com/",
                                "display_url": "ussoccer.com",
                                "indices": [
                                    0,
                                    23
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 1599897,
                "friends_count": 195,
                "listed_count": 13066,
                "created_at": "Wed Jul 18 16:32:18 +0000 2007",
                "favourites_count": 325,
                "utc_offset": -18000,
                "time_zone": "Central Time (US & Canada)",
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 34253,
                "lang": "en",
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "FFFFFF",
                "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/704355235725254656/dsBdJWzT.jpg",
                "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/704355235725254656/dsBdJWzT.jpg",
                "profile_background_tile": false,
                "profile_image_url": "http://pbs.twimg.com/profile_images/704355346622586884/oGZUl3xk_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/704355346622586884/oGZUl3xk_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/7563792/1466312103",
                "profile_link_color": "1D16E3",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "EFEFEF",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": false,
                "follow_request_sent": false,
                "notifications": false
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 5395,
            "favorite_count": 4699,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "possibly_sensitive_appealable": false,
            "lang": "en"
        },
        "is_quote_status": false,
        "retweet_count": 5395,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Sat Jun 11 23:02:15 +0000 2016",
        "id": 741767530449010700,
        "id_str": "741767530449010688",
        "text": "Good luck @ussoccer!",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [
                {
                    "screen_name": "ussoccer",
                    "name": "U.S. Soccer",
                    "id": 7563792,
                    "id_str": "7563792",
                    "indices": [
                        10,
                        19
                    ]
                }
            ],
            "urls": []
        },
        "source": "<a href=\"http://www.hootsuite.com\" rel=\"nofollow\">Hootsuite</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 4,
        "favorite_count": 23,
        "favorited": false,
        "retweeted": false,
        "lang": "en"
    },
    {
        "created_at": "Fri Jun 10 14:41:47 +0000 2016",
        "id": 741279194974298100,
        "id_str": "741279194974298112",
        "text": "It's really real. #Ubuntu on #Windows. Running #bash. Amazing. https://t.co/adYBEd1Q8s",
        "truncated": false,
        "entities": {
            "hashtags": [
                {
                    "text": "Ubuntu",
                    "indices": [
                        18,
                        25
                    ]
                },
                {
                    "text": "Windows",
                    "indices": [
                        29,
                        37
                    ]
                },
                {
                    "text": "bash",
                    "indices": [
                        47,
                        52
                    ]
                }
            ],
            "symbols": [],
            "user_mentions": [],
            "urls": [],
            "media": [
                {
                    "id": 741279190805184500,
                    "id_str": "741279190805184512",
                    "indices": [
                        63,
                        86
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkmNfx9VAAAxeGD.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkmNfx9VAAAxeGD.jpg",
                    "url": "https://t.co/adYBEd1Q8s",
                    "display_url": "pic.twitter.com/adYBEd1Q8s",
                    "expanded_url": "http://twitter.com/markkukero/status/741279194974298112/photo/1",
                    "type": "photo",
                    "sizes": {
                        "medium": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 340,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 741279190805184500,
                    "id_str": "741279190805184512",
                    "indices": [
                        63,
                        86
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkmNfx9VAAAxeGD.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkmNfx9VAAAxeGD.jpg",
                    "url": "https://t.co/adYBEd1Q8s",
                    "display_url": "pic.twitter.com/adYBEd1Q8s",
                    "expanded_url": "http://twitter.com/markkukero/status/741279194974298112/photo/1",
                    "type": "photo",
                    "sizes": {
                        "medium": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 680,
                            "h": 340,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 512,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 16411983,
            "id_str": "16411983",
            "name": "Markku Kero",
            "screen_name": "markkukero",
            "location": "",
            "description": "@eqela and @EmergeTrainings",
            "url": "http://t.co/wVnb7Ynk40",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/wVnb7Ynk40",
                            "expanded_url": "http://www.markkukero.com",
                            "display_url": "markkukero.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 205,
            "friends_count": 188,
            "listed_count": 12,
            "created_at": "Mon Sep 22 23:30:42 +0000 2008",
            "favourites_count": 7,
            "utc_offset": 28800,
            "time_zone": "Singapore",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 116,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "C0DEED",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/691445239047847936/-HcHvUjC_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/16411983/1453675453",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "C0DEED",
            "profile_sidebar_fill_color": "DDEEF6",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": true,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 2,
        "favorite_count": 2,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Fri Jun 10 11:09:38 +0000 2016",
        "id": 741225806001770500,
        "id_str": "741225806001770496",
        "text": "one person followed me // automatically checked by https://t.co/QPcvJXqLDq",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/QPcvJXqLDq",
                    "expanded_url": "http://fllwrs.com",
                    "display_url": "fllwrs.com",
                    "indices": [
                        51,
                        74
                    ]
                }
            ]
        },
        "source": "<a href=\"http://fllwrs.com\" rel=\"nofollow\">fllwrs</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 82299507,
            "id_str": "82299507",
            "name": "annisa",
            "screen_name": "auuah",
            "location": "Semarang Timur, Indonesia",
            "description": "analyst at chemistry laboratory",
            "url": "https://t.co/mWckGAgP6c",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "https://t.co/mWckGAgP6c",
                            "expanded_url": "https://twitter.com/auuah",
                            "display_url": "twitter.com/auuah",
                            "indices": [
                                0,
                                23
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1014,
            "friends_count": 307,
            "listed_count": 3,
            "created_at": "Wed Oct 14 07:13:56 +0000 2009",
            "favourites_count": 142,
            "utc_offset": 25200,
            "time_zone": "Jakarta",
            "geo_enabled": true,
            "verified": false,
            "statuses_count": 1715,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "000000",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/378800000123374253/c9fd6c00c54c937ce54f4dd31438fdfe.jpeg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/378800000123374253/c9fd6c00c54c937ce54f4dd31438fdfe.jpeg",
            "profile_background_tile": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/711557584172363776/fxBPoK-O_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/711557584172363776/fxBPoK-O_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/82299507/1445340784",
            "profile_link_color": "FF0000",
            "profile_sidebar_border_color": "000000",
            "profile_sidebar_fill_color": "26C50A",
            "profile_text_color": "4EF830",
            "profile_use_background_image": false,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 0,
        "favorite_count": 0,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Tue Jun 07 14:42:45 +0000 2016",
        "id": 740192275179802600,
        "id_str": "740192275179802624",
        "text": "10 reasons why being a Team Leader rocks!Â [re-post] https://t.co/jDhi5bCPDq https://t.co/vXn5AFchwI",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/jDhi5bCPDq",
                    "expanded_url": "http://news.sfimg.com/2016/06/07/10-reasons-why-being-a-team-leader-rocks-re-post",
                    "display_url": "news.sfimg.com/2016/06/07/10-â€¦",
                    "indices": [
                        52,
                        75
                    ]
                }
            ],
            "media": [
                {
                    "id": 740192271589462000,
                    "id_str": "740192271589462016",
                    "indices": [
                        76,
                        99
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkWw8wWUUAAX84h.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkWw8wWUUAAX84h.jpg",
                    "url": "https://t.co/vXn5AFchwI",
                    "display_url": "pic.twitter.com/vXn5AFchwI",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/740192275179802624/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 816,
                            "h": 1084,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 512,
                            "h": 680,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 816,
                            "h": 1084,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 740192271589462000,
                    "id_str": "740192271589462016",
                    "indices": [
                        76,
                        99
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkWw8wWUUAAX84h.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkWw8wWUUAAX84h.jpg",
                    "url": "https://t.co/vXn5AFchwI",
                    "display_url": "pic.twitter.com/vXn5AFchwI",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/740192275179802624/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 816,
                            "h": 1084,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 512,
                            "h": 680,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 816,
                            "h": 1084,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 21,
        "favorite_count": 68,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Mon Jun 06 17:06:08 +0000 2016",
        "id": 739865971347755000,
        "id_str": "739865971347755008",
        "text": "Powerful new E365 2.0 hasÂ arrived! https://t.co/nv00jJB6J1 https://t.co/1YtZie8QRa",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/nv00jJB6J1",
                    "expanded_url": "http://news.sfimg.com/2016/06/06/powerful-new-e365-2-0-has-arrived",
                    "display_url": "news.sfimg.com/2016/06/06/powâ€¦",
                    "indices": [
                        35,
                        58
                    ]
                }
            ],
            "media": [
                {
                    "id": 739865968126500900,
                    "id_str": "739865968126500865",
                    "indices": [
                        59,
                        82
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkSILZOUoAEv8o1.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkSILZOUoAEv8o1.jpg",
                    "url": "https://t.co/1YtZie8QRa",
                    "display_url": "pic.twitter.com/1YtZie8QRa",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/739865971347755008/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 680,
                            "h": 302,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 455,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1024,
                            "h": 455,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 739865968126500900,
                    "id_str": "739865968126500865",
                    "indices": [
                        59,
                        82
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkSILZOUoAEv8o1.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkSILZOUoAEv8o1.jpg",
                    "url": "https://t.co/1YtZie8QRa",
                    "display_url": "pic.twitter.com/1YtZie8QRa",
                    "expanded_url": "http://twitter.com/SFIUpdate/status/739865971347755008/photo/1",
                    "type": "photo",
                    "sizes": {
                        "small": {
                            "w": 680,
                            "h": 302,
                            "resize": "fit"
                        },
                        "large": {
                            "w": 1024,
                            "h": 455,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 1024,
                            "h": 455,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 21,
        "favorite_count": 70,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Mon Jun 06 16:16:48 +0000 2016",
        "id": 739853555788456000,
        "id_str": "739853555788455941",
        "text": "Happy Monday everyone! Leave the Monday Blues, and chat with friends on Tinychat ðŸ˜‰ðŸ˜‰ https://t.co/f8HeYmTAWZ",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [],
            "media": [
                {
                    "id": 739853160919883800,
                    "id_str": "739853160919883777",
                    "indices": [
                        84,
                        107
                    ],
                    "media_url": "http://pbs.twimg.com/tweet_video_thumb/CkR8h6qUYAEYj4h.jpg",
                    "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CkR8h6qUYAEYj4h.jpg",
                    "url": "https://t.co/f8HeYmTAWZ",
                    "display_url": "pic.twitter.com/f8HeYmTAWZ",
                    "expanded_url": "http://twitter.com/tinychat/status/739853555788455941/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 400,
                            "h": 224,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 340,
                            "h": 190,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 400,
                            "h": 224,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 739853160919883800,
                    "id_str": "739853160919883777",
                    "indices": [
                        84,
                        107
                    ],
                    "media_url": "http://pbs.twimg.com/tweet_video_thumb/CkR8h6qUYAEYj4h.jpg",
                    "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CkR8h6qUYAEYj4h.jpg",
                    "url": "https://t.co/f8HeYmTAWZ",
                    "display_url": "pic.twitter.com/f8HeYmTAWZ",
                    "expanded_url": "http://twitter.com/tinychat/status/739853555788455941/photo/1",
                    "type": "animated_gif",
                    "sizes": {
                        "large": {
                            "w": 400,
                            "h": 224,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "small": {
                            "w": 340,
                            "h": 190,
                            "resize": "fit"
                        },
                        "medium": {
                            "w": 400,
                            "h": 224,
                            "resize": "fit"
                        }
                    },
                    "video_info": {
                        "aspect_ratio": [
                            25,
                            14
                        ],
                        "variants": [
                            {
                                "bitrate": 0,
                                "content_type": "video/mp4",
                                "url": "https://pbs.twimg.com/tweet_video/CkR8h6qUYAEYj4h.mp4"
                            }
                        ]
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 54,
        "favorite_count": 91,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Fri Jun 03 20:19:25 +0000 2016",
        "id": 738827449899712500,
        "id_str": "738827449899712512",
        "text": "Don't forget! From now until Monday, send or receive a BEST CAMERA AWARD gift, and you could win 5,000 Coins! W0OT! https://t.co/THGa02TIUU",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [],
            "media": [
                {
                    "id": 738827445873188900,
                    "id_str": "738827445873188864",
                    "indices": [
                        116,
                        139
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkDXpcWUoAANZFE.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkDXpcWUoAANZFE.jpg",
                    "url": "https://t.co/THGa02TIUU",
                    "display_url": "pic.twitter.com/THGa02TIUU",
                    "expanded_url": "http://twitter.com/tinychat/status/738827449899712512/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "extended_entities": {
            "media": [
                {
                    "id": 738827445873188900,
                    "id_str": "738827445873188864",
                    "indices": [
                        116,
                        139
                    ],
                    "media_url": "http://pbs.twimg.com/media/CkDXpcWUoAANZFE.jpg",
                    "media_url_https": "https://pbs.twimg.com/media/CkDXpcWUoAANZFE.jpg",
                    "url": "https://t.co/THGa02TIUU",
                    "display_url": "pic.twitter.com/THGa02TIUU",
                    "expanded_url": "http://twitter.com/tinychat/status/738827449899712512/photo/1",
                    "type": "photo",
                    "sizes": {
                        "large": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        },
                        "thumb": {
                            "w": 150,
                            "h": 150,
                            "resize": "crop"
                        },
                        "medium": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        },
                        "small": {
                            "w": 500,
                            "h": 500,
                            "resize": "fit"
                        }
                    }
                }
            ]
        },
        "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 32309773,
            "id_str": "32309773",
            "name": "tinychat",
            "screen_name": "tinychat",
            "location": "",
            "description": "Video Chat, Simple & Easy",
            "url": "http://t.co/RhAVfzZMmV",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/RhAVfzZMmV",
                            "expanded_url": "http://www.tinychat.com",
                            "display_url": "tinychat.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 1234540,
            "friends_count": 4,
            "listed_count": 3686,
            "created_at": "Fri Apr 17 04:40:31 +0000 2009",
            "favourites_count": 134,
            "utc_offset": -14400,
            "time_zone": "Eastern Time (US & Canada)",
            "geo_enabled": false,
            "verified": true,
            "statuses_count": 559,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "FFFFFF",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/98672892/tc_bg_top.png",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/727174338588217344/Z9SN3LEx_normal.jpg",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/32309773/1419008872",
            "profile_link_color": "0084B4",
            "profile_sidebar_border_color": "D7EBC5",
            "profile_sidebar_fill_color": "F6FFF0",
            "profile_text_color": "333333",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": true
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 7,
        "favorite_count": 28,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Wed Jun 01 17:06:19 +0000 2016",
        "id": 738054077410463700,
        "id_str": "738054077410463744",
        "text": "Adjustment to Team LeaderÂ qualifications https://t.co/Igk5rE9cCr",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/Igk5rE9cCr",
                    "expanded_url": "http://news.sfimg.com/2016/06/01/adjustment-to-team-leader-qualifications",
                    "display_url": "news.sfimg.com/2016/06/01/adjâ€¦",
                    "indices": [
                        41,
                        64
                    ]
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 18,
        "favorite_count": 67,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    },
    {
        "created_at": "Wed Jun 01 16:21:29 +0000 2016",
        "id": 738042795156377600,
        "id_str": "738042795156377600",
        "text": "VersaPoints no longerÂ expire! https://t.co/mHqw3uCkTi",
        "truncated": false,
        "entities": {
            "hashtags": [],
            "symbols": [],
            "user_mentions": [],
            "urls": [
                {
                    "url": "https://t.co/mHqw3uCkTi",
                    "expanded_url": "http://news.sfimg.com/2016/06/01/versapoints-no-longer-expire",
                    "display_url": "news.sfimg.com/2016/06/01/verâ€¦",
                    "indices": [
                        30,
                        53
                    ]
                }
            ]
        },
        "source": "<a href=\"http://publicize.wp.com/\" rel=\"nofollow\">WordPress.com</a>",
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 35574390,
            "id_str": "35574390",
            "name": "SFI Corporate",
            "screen_name": "SFIUpdate",
            "location": "Lincoln, Nebraska USA",
            "description": "Affiliate updates from SFI Marketing Group, one of the world's largest and most successful networks for Internet entrepreneurs.  Now in our 18th year!",
            "url": "http://t.co/GJ4t3SH9vh",
            "entities": {
                "url": {
                    "urls": [
                        {
                            "url": "http://t.co/GJ4t3SH9vh",
                            "expanded_url": "http://www.sfimg.com",
                            "display_url": "sfimg.com",
                            "indices": [
                                0,
                                22
                            ]
                        }
                    ]
                },
                "description": {
                    "urls": []
                }
            },
            "protected": false,
            "followers_count": 290572,
            "friends_count": 8,
            "listed_count": 1916,
            "created_at": "Sun Apr 26 21:45:22 +0000 2009",
            "favourites_count": 0,
            "utc_offset": -18000,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "verified": false,
            "statuses_count": 2530,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "is_translation_enabled": false,
            "profile_background_color": "347BA3",
            "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/16663410/Twitter-BG-Template.jpg",
            "profile_background_tile": false,
            "profile_image_url": "http://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/418797189381386240/mZbsRUOj_normal.png",
            "profile_link_color": "003366",
            "profile_sidebar_border_color": "336699",
            "profile_sidebar_fill_color": "FFCC00",
            "profile_text_color": "3C3940",
            "profile_use_background_image": true,
            "has_extended_profile": false,
            "default_profile": false,
            "default_profile_image": false,
            "following": true,
            "follow_request_sent": false,
            "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "is_quote_status": false,
        "retweet_count": 10,
        "favorite_count": 62,
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "possibly_sensitive_appealable": false,
        "lang": "en"
    }
]
