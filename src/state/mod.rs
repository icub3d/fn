use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::sync::RwLock;

use failure::Error;

pub struct State {
    pub words: HashSet<String>,
}

pub fn new() -> Result<RwLock<State>, Error> {
    Ok(RwLock::new(State { words: words()? }))
}

fn words() -> Result<HashSet<String>, Error> {
    // Read our word list.
    let mut words = HashSet::new();
    let file = File::open("words.txt")?;
    let reader = BufReader::new(file);
    for line in reader.lines() {
        words.insert(line?);
    }
    Ok(words)
}
