package com.epl.fantasy_player_finder.player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository // provides CRUD operations for Player entity
public interface PlayerRepository extends JpaRepository<Player, String>, JpaSpecificationExecutor<Player>{
    void deleteByPlayerName(String playerName); //deletes player by finding name
    Optional<Player> findByPlayerName(String playerName);

    @Query(value = """
        SELECT * FROM player_statistics
        WHERE (COALESCE(:#{#teamNames?.size()}, 0) = 0 OR team_name IN (:teamNames))
          AND (COALESCE(:#{#positions?.size()}, 0) = 0 OR position IN (:positions))
          AND (COALESCE(:#{#nations?.size()}, 0) = 0 OR nation IN (:nations))
          AND (:minAge IS NULL OR age >= :minAge)
          AND (:maxAge IS NULL OR age <= :maxAge)
          AND (:minGoals IS NULL OR goals >= :minGoals)
          AND (:maxGoals IS NULL OR goals <= :maxGoals)
          AND (:minAssists IS NULL OR assists >= :minAssists)
          AND (:maxAssists IS NULL OR assists <= :maxAssists)
           AND (:minGoalsAndAssists IS NULL OR\s
                       COALESCE(goals_assists, COALESCE(goals, 0) + COALESCE(assists, 0)) >= :minGoalsAndAssists)
           AND (:maxGoalsAndAssists IS NULL OR\s
                       COALESCE(goals_assists, COALESCE(goals, 0) + COALESCE(assists, 0)) <= :maxGoalsAndAssists)
          AND (:minMatchesPlayed IS NULL OR matches_played >= :minMatchesPlayed)
          AND (:maxMatchesPlayed IS NULL OR matches_played <= :maxMatchesPlayed)
          AND (:minMatchesStarted IS NULL OR matches_started >= :minMatchesStarted)
          AND (:maxMatchesStarted IS NULL OR matches_started <= :maxMatchesStarted)
        """, nativeQuery = true)
    List<Player> filterPlayers(
            @Param("teamNames") List<String> teamNames,
            @Param("positions") List<String> positions,
            @Param("nations") List<String> nations,
            @Param("minAge") Double minAge,
            @Param("maxAge") Double maxAge,
            @Param("minGoals") Double minGoals,
            @Param("maxGoals") Double maxGoals,
            @Param("minAssists") Double minAssists,
            @Param("maxAssists") Double maxAssists,
            @Param("minGoalsAndAssists") Double minGoalsAndAssists,
            @Param("maxGoalsAndAssists") Double maxGoalsAndAssists,
            @Param("minMatchesPlayed") Double minMatchesPlayed,
            @Param("maxMatchesPlayed") Double maxMatchesPlayed,
            @Param("minMatchesStarted") Integer minMatchesStarted,
            @Param("maxMatchesStarted") Integer maxMatchesStarted
    );

    // Helper methods to get unique values for frontend dropdowns/filters
    @Query("SELECT DISTINCT p.team_name FROM Player p WHERE p.team_name IS NOT NULL ORDER BY p.team_name")
    List<String> findAllTeamNames();

    @Query("SELECT DISTINCT p.position FROM Player p WHERE p.position IS NOT NULL ORDER BY p.position")
    List<String> findAllPositions();

    @Query("SELECT DISTINCT p.nation FROM Player p WHERE p.nation IS NOT NULL ORDER BY p.nation")
    List<String> findAllNations();

}