export class dj{
	constructor(name, eventdates, playlists){
		this.name=name;
		this.eventdates=eventdates;
		this.playlists=playlists;
	}
	add_playlist(playlist){
		this.playlists.push(playlist);
	}
}
export class playlist{
	constructor(name, songs){
		this.name=name;
		this.songs=songs;
	}
	add_song(song){
		this.songs.push(song);
	}
	
}
export class song {
	constructor(name, artist, album, timeslot){
		this.name=name;
		this.artist=artist;
		this.album=album;
		this.timeslot=timeslot;
	}
}
//module.exports = {dj, playlist, song};