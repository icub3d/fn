use serde_json::json;

use rocket;
use rocket::response::status::BadRequest;

use icub3d_sudoku_solver::Board;

#[get("/?<board>")]
pub fn solve(board: String) -> Result<String, BadRequest<String>> {
    let mut board = match Board::new(board) {
        Ok(board) => board,
        Err(e) => return Err(BadRequest(Some(e.to_string()))),
    };
    if !board.solve() {
        return Err(BadRequest(Some("board was not solvable".to_string())));
    }
    let json = json!(board.to_string());
    Ok(json.to_string())
}
