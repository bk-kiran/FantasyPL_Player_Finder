package com.epl.fantasy_player_finder.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity //maps to pl stats database table
@Table(name="player_statistics")
public class Player {

    @Id  // primary key
    @Column(name = "playerName", unique = true)
    private String playerName;

    private String nation;
    private String position;
    private Double age;
    private Double matches_played;
    private Integer matches_started;
    private Double minutes_played;
    private Double yellow_cards;
    private Double red_cards;
    private Double goals;
    private Double assists;
    private Double goals_assists;
    private Double expected_goals;
    private Double expected_assists;
    private Double expected_g_and_a;
    private Double goals_per_game;
    private Double assists_per_game;
    private Double g_and_a_per_game;
    private Double expected_goals_per_game;
    private Double expected_assists_per_game;
    private String team_name;
    private String league_last_season;

    public Player() {

    }

    public Player(String playerName, String nation, String position, Double age, Double matches_played, Integer matches_started, Double minutes_played, Double yellow_cards, Double red_cards, Double goals, Double assists, Double goals_assists, Double expected_goals, Double expected_assists, Double expected_g_and_a, Double goals_per_game, Double assists_per_game, Double g_and_a_per_game, Double expected_goals_per_game, Double expected_assists_per_game, String team_name, String league_last_season) {
        this.playerName = playerName;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.matches_played = matches_played;
        this.matches_started = matches_started;
        this.minutes_played = minutes_played;
        this.yellow_cards = yellow_cards;
        this.red_cards = red_cards;
        this.goals = goals;
        this.assists = assists;
        this.goals_assists = goals_assists;
        this.expected_goals = expected_goals;
        this.expected_assists = expected_assists;
        this.expected_g_and_a = expected_g_and_a;
        this.goals_per_game = goals_per_game;
        this.assists_per_game = assists_per_game;
        this.g_and_a_per_game = g_and_a_per_game;
        this.expected_goals_per_game = expected_goals_per_game;
        this.expected_assists_per_game = expected_assists_per_game;
        this.team_name = team_name;
        this.league_last_season = league_last_season;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Double getAge() {
        return age;
    }

    public void setAge(Double age) {
        this.age = age;
    }

    public Double getMatches_played() {
        return matches_played;
    }

    public void setMatches_played(Double matches_played) {
        this.matches_played = matches_played;
    }

    public Integer getMatches_started() {
        return matches_started;
    }

    public void setMatches_started(Integer matches_started) {
        this.matches_started = matches_started;
    }

    public Double getMinutes_played() {
        return minutes_played;
    }

    public void setMinutes_played(Double minutes_played) {
        this.minutes_played = minutes_played;
    }

    public Double getYellow_cards() {
        return yellow_cards;
    }

    public void setYellow_cards(Double yellow_cards) {
        this.yellow_cards = yellow_cards;
    }

    public Double getRed_cards() {
        return red_cards;
    }

    public void setRed_cards(Double red_cards) {
        this.red_cards = red_cards;
    }

    public Double getGoals() {
        return goals;
    }

    public void setGoals(Double goals) {
        this.goals = goals;
    }

    public Double getAssists() {
        return assists;
    }

    public void setAssists(Double assists) {
        this.assists = assists;
    }

    public Double getGoals_assists() {
        // If the database field has a value, use it
        if (goals_assists != null) {
            return goals_assists;
        }
        // Otherwise calculate it
        if (goals == null && assists == null) {
            return null;
        }
        double goalValue = goals != null ? goals : 0.0;
        double assistValue = assists != null ? assists : 0.0;
        return goalValue + assistValue;
    }

    public void setGoals_assists(Double goals_assists) {
        this.goals_assists = goals_assists;
    }

    public Double getExpected_goals() {
        return expected_goals;
    }

    public void setExpected_goals(Double expected_goals) {
        this.expected_goals = expected_goals;
    }

    public Double getExpected_assists() {
        return expected_assists;
    }

    public void setExpected_assists(Double expected_assists) {
        this.expected_assists = expected_assists;
    }

    public Double getExpected_g_and_a() {
        return expected_g_and_a;
    }

    public void setExpected_g_and_a(Double expected_g_and_a) {
        this.expected_g_and_a = expected_g_and_a;
    }

    public Double getGoals_per_game() {
        return goals_per_game;
    }

    public void setGoals_per_game(Double goals_per_game) {
        this.goals_per_game = goals_per_game;
    }

    public Double getAssists_per_game() {
        return assists_per_game;
    }

    public void setAssists_per_game(Double assists_per_game) {
        this.assists_per_game = assists_per_game;
    }

    public Double getG_and_a_per_game() {
        return g_and_a_per_game;
    }

    public void setG_and_a_per_game(Double g_and_a_per_game) {
        this.g_and_a_per_game = g_and_a_per_game;
    }

    public Double getExpected_goals_per_game() {
        return expected_goals_per_game;
    }

    public void setExpected_goals_per_game(Double expected_goals_per_game) {
        this.expected_goals_per_game = expected_goals_per_game;
    }

    public Double getExpected_assists_per_game() {
        return expected_assists_per_game;
    }

    public void setExpected_assists_per_game(Double expected_assists_per_game) {
        this.expected_assists_per_game = expected_assists_per_game;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public String getLeague_last_season() {
        return league_last_season;
    }

    public void setLeague_last_season(String league_last_season) {
        this.league_last_season = league_last_season;
    }

}
