package com.epl.fantasy_player_finder.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    public List<Player> filterPlayers(PlayerFilter request) {
        return playerRepository.filterPlayers(
                request.getTeamNames(),
                request.getPositions(),
                request.getNations(),
                request.getMinAge(),
                request.getMaxAge(),
                request.getMinGoals(),
                request.getMaxGoals(),
                request.getMinAssists(),
                request.getMaxAssists(),
                request.getMinGoalsAndAssists(),
                request.getMaxGoalsAndAssists(),
                request.getMinMatchesPlayed(),
                request.getMaxMatchesPlayed(),
                request.getMinMatchesStarted(),
                request.getMaxMatchesStarted()
        );
    }

    // Helper methods for frontend to populate filter options
    public List<String> getAllTeamNames() {
        return playerRepository.findAllTeamNames();
    }

    public List<String> getAllPositions() {
        return playerRepository.findAllPositions();
    }

    public List<String> getAllNations() {
        return playerRepository.findAllNations();
    }

    // Get min/max values for sliders
    public PlayerStats getPlayerStats() {
        List<Player> allPlayers = playerRepository.findAll();

        if (allPlayers.isEmpty()) {
            return new PlayerStats();
        }

        // Calculate min/max values safely
        double minAge = allPlayers.stream().filter(p -> p.getAge() != null).mapToDouble(Player::getAge).min().orElse(0.0);
        double maxAge = allPlayers.stream().filter(p -> p.getAge() != null).mapToDouble(Player::getAge).max().orElse(0.0);
        double minGoals = allPlayers.stream().filter(p -> p.getGoals() != null).mapToDouble(Player::getGoals).min().orElse(0.0);
        double maxGoals = allPlayers.stream().filter(p -> p.getGoals() != null).mapToDouble(Player::getGoals).max().orElse(0.0);
        double minAssists = allPlayers.stream().filter(p -> p.getAssists() != null).mapToDouble(Player::getAssists).min().orElse(0.0);
        double maxAssists = allPlayers.stream().filter(p -> p.getAssists() != null).mapToDouble(Player::getAssists).max().orElse(0.0);
        double minGoalsAndAssists = allPlayers.stream().filter(p -> p.getGoals_assists() != null).mapToDouble(Player::getGoals_assists).min().orElse(0.0);
        double maxGoalsAndAssists = allPlayers.stream().filter(p -> p.getGoals_assists() != null).mapToDouble(Player::getGoals_assists).max().orElse(0.0);
        double minMatchesPlayed = allPlayers.stream().filter(p -> p.getMatches_played() != null).mapToDouble(Player::getMatches_played).min().orElse(0.0);
        double maxMatchesPlayed = allPlayers.stream().filter(p -> p.getMatches_played() != null).mapToDouble(Player::getMatches_played).max().orElse(0.0);
        int minMatchesStarted = allPlayers.stream().filter(p -> p.getMatches_started() != null).mapToInt(Player::getMatches_started).min().orElse(0);
        int maxMatchesStarted = allPlayers.stream().filter(p -> p.getMatches_started() != null).mapToInt(Player::getMatches_started).max().orElse(0);

        return new PlayerStats(minAge, maxAge, minGoals, maxGoals, minAssists, maxAssists,
                minGoalsAndAssists, maxGoalsAndAssists, minMatchesPlayed, maxMatchesPlayed,
                minMatchesStarted, maxMatchesStarted);
    }

    // Inner class to hold min/max stats for frontend sliders
    public static class PlayerStats {
        private double minAge, maxAge;
        private double minGoals, maxGoals;
        private double minAssists, maxAssists;
        private double minGoalsAndAssists, maxGoalsAndAssists;
        private double minMatchesPlayed, maxMatchesPlayed;
        private int minMatchesStarted, maxMatchesStarted;

        public PlayerStats() {}

        public PlayerStats(double minAge, double maxAge, double minGoals, double maxGoals,
                           double minAssists, double maxAssists, double minGoalsAndAssists, double maxGoalsAndAssists,
                           double minMatchesPlayed, double maxMatchesPlayed, int minMatchesStarted, int maxMatchesStarted
                           ) {
            this.minAge = minAge;
            this.maxAge = maxAge;
            this.minGoals = minGoals;
            this.maxGoals = maxGoals;
            this.minAssists = minAssists;
            this.maxAssists = maxAssists;
            this.minGoalsAndAssists = minGoalsAndAssists;
            this.maxGoalsAndAssists = maxGoalsAndAssists;
            this.minMatchesPlayed = minMatchesPlayed;
            this.maxMatchesPlayed = maxMatchesPlayed;
            this.minMatchesStarted = minMatchesStarted;
            this.maxMatchesStarted = maxMatchesStarted;
        }

        // Getters
        public double getMinAge() { return minAge; }
        public double getMaxAge() { return maxAge; }
        public double getMinGoals() { return minGoals; }
        public double getMaxGoals() { return maxGoals; }
        public double getMinAssists() { return minAssists; }
        public double getMaxAssists() { return maxAssists; }
        public double getMinGoalsAndAssists() { return minGoalsAndAssists; }
        public double getMaxGoalsAndAssists() { return maxGoalsAndAssists; }
        public double getMinMatchesPlayed() { return minMatchesPlayed; }
        public double getMaxMatchesPlayed() { return maxMatchesPlayed; }
        public int getMinMatchesStarted() { return minMatchesStarted; }
        public int getMaxMatchesStarted() { return maxMatchesStarted; }
    }

}
