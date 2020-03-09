use std::collections::HashSet;
use std::sync::RwLock;

use failure::Error;
use rocket;
use serde_json::json;

use super::state;

use icub3d_combinatorics::Combination;
use icub3d_combinatorics::Permutation;

#[get("/?<letters>&<min>")]
pub fn words(
    letters: String,
    min: usize,
    state: rocket::State<RwLock<state::State>>,
) -> Result<String, Error> {
    let state = state.read().unwrap();

    let letters: Vec<char> = letters.chars().collect();
    let mut seen = HashSet::new();
    let mut results = Vec::new();

    for x in min..letters.len() + 1 {
        for c in Combination::new(letters.len(), x) {
            for p in Permutation::new(c.len()) {
                let mut s = String::new();
                for i in p.iter() {
                    s.push(letters[c[*i]]);
                }

                if state.words.contains(&s) && !seen.contains(&s) {
                    seen.insert(s.clone());
                    results.push(s)
                }
            }
        }
    }
    let json = json!(results);
    Ok(json.to_string())
}
