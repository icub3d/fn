#![feature(proc_macro_hygiene, decl_macro)]

use failure::Error;

#[macro_use]
extern crate rocket;

use rocket_contrib::serve::StaticFiles;

mod state;
mod sudoku;
mod words;

fn main() -> Result<(), Error> {
    let state = state::new()?;

    rocket::ignite()
        .manage(state)
        .mount("/", StaticFiles::from("ui"))
        .mount("/fn/sudoku", routes![sudoku::solve])
        .mount("/fn/words", routes![words::words])
        .launch();

    Ok(())
}
