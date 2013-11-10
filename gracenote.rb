
# -*- mode:ruby; coding:utf-8 -*-
require "gracenote"

# 前回取得したClientId, ClientTag, UserIdを使用する
spec = {:clientID => "1878016", :clientTag => "09D30922804DDE56006095292EEEEF7D",
        :userID => "264677184912741402-3BBDC133C384E8059D1C378E8C758102"}
obj = Gracenote.new(spec)

result = obj.findTrack("Perfume", "GAME", "チョコレイト・ディスコ", '0').inspect
puts result