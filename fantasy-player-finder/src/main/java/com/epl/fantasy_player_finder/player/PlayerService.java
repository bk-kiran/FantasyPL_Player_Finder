package com.epl.fantasy_player_finder.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component // class manged by spring container
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired //inject player repository into server
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersFromTeam(String teamName) {
        return playerRepository.findAll().stream().filter(player -> teamName.equals(player.getTeam_name()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String searchText) {
        return playerRepository.findAll().stream().filter(player -> player.getPlayerName().
                toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByPosition(String searchText) {
        return playerRepository.findAll().stream().filter(player -> player.getPosition()
                .toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByNation(String searchText) {
        return playerRepository.findAll().stream().filter(player -> player.getNation()
                .toLowerCase().contains(searchText.toLowerCase())).collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPosition(String teamName, String position) {
        return playerRepository.findAll().stream().filter(player -> teamName.equals(
                player.getTeam_name()) && position.equals(player.getPosition()))
                .collect(Collectors.toList());
    }

    // adds player to database
    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    // update player details to database
    public Player updatePlayer(Player updatedPlayer) {
        Optional<Player> existingPlayer = playerRepository.findByPlayerName(updatedPlayer.getPlayerName());

        if (existingPlayer.isPresent()) { // check if player exists
            Player playerToUpdate = existingPlayer.get();
            playerToUpdate.setPlayerName(updatedPlayer.getPlayerName());
            playerToUpdate.setNation(updatedPlayer.getNation());
            playerToUpdate.setPosition(updatedPlayer.getPosition());
            playerToUpdate.setTeam_name(updatedPlayer.getTeam_name());

            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    //delete player
    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByPlayerName(playerName);
    }



}
