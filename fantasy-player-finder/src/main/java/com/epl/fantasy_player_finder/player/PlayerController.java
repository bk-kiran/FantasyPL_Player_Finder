package com.epl.fantasy_player_finder.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired // inject player service, delegates logic back to service layer
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping // handle all GET Requests
    public List<Player> getPlayers(
            @RequestParam(required = false) String teamName,
            @RequestParam(required = false) String playerName,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String position) {

        if (teamName != null && position != null )  {
            return playerService.getPlayersByTeamAndPosition(teamName, position);
        }

        else if (teamName != null) {
            return playerService.getPlayersFromTeam(teamName);
        }

        else if (playerName != null) {
            return playerService.getPlayersByName(playerName);
        }

        else if (position != null) {
            return playerService.getPlayersByPosition(position);
        }

        else if (nation != null) {
           return playerService.getPlayersByNation(nation);
        }

        else { // if every parameter is empty return all players
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        // trying to add player that was requested to repo and returns the response entity
        Player createdPlayer = playerService.addPlayer(player);
        // return created player with HTTP status (CREATED) if successful request
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping //handles PUT Requests for updates to player details
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        Player resultPlayer = playerService.updatePlayer(player);

        if (resultPlayer != null) { // if players exists in database
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{playerName}") //handles delete requests for a player by their name
    public ResponseEntity<String> deletePlayer(@PathVariable String playerName) {
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/filter")
    public List<Player> filterPlayers(@RequestBody PlayerFilter playerFilter) {
        return playerService.filterPlayers(playerFilter);
    }

    // New endpoints to support frontend filtering UI
    @GetMapping("/teams")
    public List<String> getAllTeams() {
        return playerService.getAllTeamNames();
    }

    @GetMapping("/positions")
    public List<String> getAllPositions() {
        return playerService.getAllPositions();
    }

    @GetMapping("/nations")
    public List<String> getAllNations() {
        return playerService.getAllNations();
    }

    @GetMapping("/stats")
    public PlayerService.PlayerStats getPlayerStats() {
        return playerService.getPlayerStats();
    }




}
