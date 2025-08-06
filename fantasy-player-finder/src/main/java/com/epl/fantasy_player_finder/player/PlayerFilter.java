package com.epl.fantasy_player_finder.player;

import java.util.List;

public class PlayerFilter {
    private List<String> nations;
    private List<String> teamNames;
    private List<String> positions;
    private Double minAge;
    private Double maxAge;
    private Double minGoals;
    private Double maxGoals;
    private Double minAssists;
    private Double maxAssists;
    private Double minGoalsAndAssists;
    private Double maxGoalsAndAssists;
    private Integer minMatchesStarted;
    private Integer maxMatchesStarted;
    private Double minMatchesPlayed;
    private Double maxMatchesPlayed;


    // Getters and Setters
    public List<String> getNations() {
        return nations;
    }

    public void setNations(List<String> nations) {
        this.nations = nations;
    }

    public List<String> getTeamNames() {
        return teamNames;
    }

    public void setTeamNames(List<String> teamNames) {
        this.teamNames = teamNames;
    }

    public List<String> getPositions() {
        return positions;
    }

    public void setPositions(List<String> positions) {
        this.positions = positions;
    }

    public Double getMinAge() {
        return minAge;
    }

    public void setMinAge(Double minAge) {
        this.minAge = minAge;
    }

    public Double getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Double maxAge) {
        this.maxAge = maxAge;
    }

    public Double getMinGoals() {
        return minGoals;
    }

    public void setMinGoals(Double minGoals) {
        this.minGoals = minGoals;
    }

    public Double getMaxGoals() {
        return maxGoals;
    }

    public void setMaxGoals(Double maxGoals) {
        this.maxGoals = maxGoals;
    }

    public Double getMinAssists() {
        return minAssists;
    }

    public void setMinAssists(Double minAssists) {
        this.minAssists = minAssists;
    }

    public Double getMaxAssists() {
        return maxAssists;
    }

    public void setMaxAssists(Double maxAssists) {
        this.maxAssists = maxAssists;
    }

    public Double getMinGoalsAndAssists() {
        return minGoalsAndAssists;
    }

    public void setMinGoalsAndAssists(Double minGoalsAndAssists) {
        this.minGoalsAndAssists = minGoalsAndAssists;
    }

    public Double getMaxGoalsAndAssists() {
        return maxGoalsAndAssists;
    }

    public void setMaxGoalsAndAssists(Double maxGoalsAndAssists) {
        this.maxGoalsAndAssists = maxGoalsAndAssists;
    }

    public Integer getMinMatchesStarted() {
        return minMatchesStarted;
    }

    public void setMinMatchesStarted(Integer minMatchesStarted) {
        this.minMatchesStarted = minMatchesStarted;
    }

    public Integer getMaxMatchesStarted() {
        return maxMatchesStarted;
    }

    public void setMaxMatchesStarted(Integer maxMatchesStarted) {
        this.maxMatchesStarted = maxMatchesStarted;
    }

    public Double getMinMatchesPlayed() {
        return minMatchesPlayed;
    }

    public void setMinMatchesPlayed(Double minMatchesPlayed) {
        this.minMatchesPlayed = minMatchesPlayed;
    }

    public Double getMaxMatchesPlayed() {
        return maxMatchesPlayed;
    }

    public void setMaxMatchesPlayed(Double maxMatchesPlayed) {
        this.maxMatchesPlayed = maxMatchesPlayed;
    }

}