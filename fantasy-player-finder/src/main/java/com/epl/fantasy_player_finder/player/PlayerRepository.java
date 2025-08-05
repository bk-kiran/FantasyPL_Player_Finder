package com.epl.fantasy_player_finder.player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // provides CRUD operations for Player entity
public interface PlayerRepository extends JpaRepository<Player, String> {
    void deleteByPlayerName(String playerName); //deletes player by finding name
    Optional<Player> findByPlayerName(String playerName);

}
