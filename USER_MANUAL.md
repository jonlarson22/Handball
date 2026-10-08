# Club Handball App — Complete User Manual

*This manual covers everything in the app: every tab, button, toggle, and checkbox. Written for club members, volunteers, scorekeepers, and admins.*

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Public Tabs (No Login Required)](#public-tabs)
   - [Rankings](#rankings)
   - [Tournaments (Public View)](#tournaments-public)
   - [Enter Results](#enter-results)
   - [History](#history)
3. [Admin Tab (Login Required)](#admin-tab)
   - [Review](#review)
   - [Players](#players-admin)
   - [Tournaments (Admin Setup)](#tournaments-admin)
   - [Data](#data)
   - [Roles](#roles)
4. [User Roles Explained](#roles-explained)
5. [Common Workflows](#workflows)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

The app works on any phone or computer with a web browser. No installation needed — just open the website.

**You do NOT need to log in** to view rankings, browse tournaments, enter match results, or look up history. Logging in is only required for admin functions (approving submissions, managing players, running tournaments).

**First-time login:** If you're an admin, log in with your email and password. The very first person to log in automatically becomes the Owner. Everyone else starts with no role and must request access (see Roles below).

---

## Public Tabs

### Rankings

The default landing page. Shows the club's ELO rankings.

**Singles / Doubles toggle** — Switches between singles rankings and doubles rankings. Each player has a separate ELO rating for singles and doubles.

**Search bar** — Type a name to filter the list.

**What you see per player:**
- **Rank** (#1, #2, #3...)
- **Name**
- **ELO rating** (higher = stronger; everyone starts at 1000)
- **W-L record** (wins and losses)

**Tap any player row** to open their **Player Report**, which shows:
- Current, peak, and lowest ELO (with dates) for singles and doubles separately
- Win-loss record
- A graph of their ELO over time (tap any point to see the date, rating, opponent, and score)
- Full match history with scores
- **Date filter** — show only matches from a date range
- **Type filter** — show only singles, only doubles, or both
- **Opponent filter** — show only matches against a specific player
- **Export** — opens a print dialog so you can save as PDF

**UHA Member badge** — A checkmark indicates the player is a dues-paying club member.

---

### Tournaments (Public View)

Shows the current live tournament bracket, or a message if no tournament is running.

**Tournament dropdown** — If multiple tournaments exist, pick which one to view.

**Event dropdown** — If the tournament has multiple events (e.g., "Men's Singles" and "Women's Doubles"), pick which bracket to see.

**What you see:**
- Full bracket with all matches, scores, and winners
- **BYE** entries where a player had no opponent
- **TBD** (To Be Determined) where a winner hasn't been decided yet
- Live scores update in real-time if a match is being scored

**Enter Score button** (green) — Opens a chooser with two options:
- **🔴 Live Scoring** — Score a match point-by-point in real-time. The bracket updates live. You do NOT need to log in — just enter your name as the scorekeeper. If someone else is already scoring that match, you'll see their name and can choose to Take Over or Cancel.
- **📝 Enter Final Score** — Just type in the final score of a completed match. This goes to the review queue for an admin to approve.

---

### Enter Results

For submitting completed club matches (not tournament matches — those go through the Tournaments tab).

**How to submit a match:**
1. Select **Singles** or **Doubles** (toggle at top)
2. Pick the **Winner(s)** from the dropdowns (for doubles, pick both partners)
3. Pick the **Loser(s)** from the dropdowns
4. Enter the game scores (G1, G2, G3) — e.g., Winner 21-15, 19-21, 21-18
5. Hit **Submit Score**

Your submission goes to the **Review Queue**. An admin will approve it, and then it counts toward ELO ratings. You'll see a confirmation when it's submitted.

**Why a queue?** This prevents typos, duplicate entries, and incorrect scores from affecting everyone's ratings. An admin verifies each submission before it's official.

---

### History

A searchable archive of all completed matches.

**Singles / Doubles toggle** — Filter by match type.

**Search bar** — Find matches by player name.

**Date range** — Filter matches by date.

**What you see per match:**
- Date
- Winner(s) and Loser(s)
- Game scores
- ELO change for each player

**Head-to-Head section** (bottom of page):
- Pick two players from the dropdowns
- See their all-time record against each other
- See every match they've played, with scores and dates

---

## Admin Tab

*Requires login. What you see depends on your role (see Roles Explained below).*

After logging in, you'll see your email at the top and a **Logout** button.

The Admin tab has five sub-tabs (you may not see all of them — it depends on your role):

---

### Review

The approval queue for submitted match results. This is where you verify scores before they affect ELO ratings.

**What you see per submission:**
- Date submitted
- Who submitted it (if they entered their name)
- Winner(s) and Loser(s)
- Game scores
- For tournament results: which event and round, and whether it was scored live or entered manually
- For live-scored matches: who the scorekeeper was

**Buttons per submission:**
- **Approve** (green checkmark) — Accepts the result. ELO ratings update immediately. The match moves to History.
- **Reject** (red X) — Deletes the submission. It does NOT affect ratings. Use this for duplicates, typos, or incorrect scores.
- **Edit** (pencil icon) — Opens the submission for correction. You can fix scores, players, or dates, then resubmit. The original stays in the queue until you submit the corrected version.

**Bulk actions** (top of page):
- **Approve All** — Approves every pending submission at once. Use carefully.

**Filter** — Show only club matches, only tournament results, or all.

---

### Players (Admin)

Manage the club roster.

**Add Player** (top section):
- **Name** — The player's full name
- **Singles ELO** — Starting rating (default 1000; only change this if importing a player with a known rating)
- **Doubles ELO** — Same for doubles
- **UHA Member checkbox** — Check if they're a dues-paying member
- **Add to Database** button — Creates the player

**Manage Roster** (middle section):
- **Search** — Find a player by name
- Each player row shows: name, singles ELO, doubles ELO, member status
- **Edit** — Change their name, ratings, or member status
- **Retire** — Marks them as inactive (they disappear from dropdowns but their history is kept)
- **Reactivate** — Brings a retired player back

**Edit Player** (when you click Edit):
- Change name, singles/doubles ELO, or member status
- **Manual rating adjustments** are logged and shown in the player's report (so everyone can see when an admin changed a rating by hand)
- **Update Player** button saves changes

---

### Tournaments (Admin Setup)

This is where you build and run tournaments. It has three columns on desktop (stacked on mobile):

#### Column 1: Tournament Name & Configuration

**Tournament Name** — The overall name (e.g., "2026 State Doubles"). This appears as the main title on the public bracket page.

**Configuration: Singles / Doubles toggle** — The selected option highlights in blue. This sets whether the event is singles or doubles.

**Format dropdown** — Choose the tournament structure:
- **Single Elimination Knockout** — Lose once and you're out. Standard bracket.
- **Double Elimination** — Lose twice and you're out. Has a winners bracket and losers bracket.
- **Round Robin** — Everyone plays everyone. Best record wins.
- **Multi-Group Round Robin** — Players split into groups, round robin within each group, then top finishers advance to a knockout stage.

**Format-specific settings** (appear based on your format choice):
- *Single Elimination:* **Generate 3rd Place Playoff Match** checkbox — Adds a bronze-medal match between the semifinal losers.
- *Double Elimination:* **Final rule** dropdown — How the grand final works.
- *Multi-Group:* **Number of groups**, **Players per group**, **Advance per group** — Controls the group stage setup.

**Seeding dropdown** — How players are placed in the bracket:
- **ELO Seeding (auto)** — Highest-rated players are spread across the bracket so they meet as late as possible (1v8, 4v5, 2v7, 3v6 for 8 players).
- **Random Draw** — Completely random placement. Can produce spicy early matchups.
- **Manual Seeds** — You pick the seed order by tapping players in order (1st tap = #1 seed, 2nd tap = #2 seed, etc.). Use the ▲▼ arrows to re-rank, ✕ to remove. Unseeded players are drawn randomly.

**Event Name** — Name this specific event (e.g., "Men's Open Singles"). If you're running multiple events in one tournament, each gets its own name. This appears as the division header on the bracket.

**Lock Event button** — Saves the current event configuration and player list. You can lock multiple events (e.g., "Men's Singles" and "Women's Doubles") before starting the tournament. Locked events appear in a list below with a ✅.

**Start Tournament button** — Builds all the brackets for your locked events and makes the tournament live. The public bracket page updates immediately.

**Edit Live Tournament Setup button** — Pulls the currently live tournament back into the setup screen so you can add or remove events. (For swapping players or fixing scores, do that directly on the bracket — see below.)

**Manual Bracket Override button** (red) — Opens a tool for manually moving players in the bracket. Use sparingly — this bypasses the normal bracket logic.

#### Column 2: Players

**New Player Name** — Quick-add a player who isn't in the database yet. Enter their name and starting ELOs, check UHA Member if applicable, and hit **+ Add to Database**.

**UHA Player Search** — Type to filter the player list below.

**Player list** — Shows all active players with their ELO. Click a player to add them to the **Selected Players** column (or drag, depending on your device). Click again to remove.

#### Column 3: Selected Players

Shows who's been picked for the current event. Each entry shows the player name and ELO.

**Remove** (✕ per player) — Takes them out of the selection.

**Clear All** — Empties the selection.

#### On the Live Bracket (after starting)

**Enter Score** (per match) — Opens the score chooser (Live Scoring vs Enter Final Score). Same as the public view, but as a logged-in admin/director, your scores apply directly without going through the review queue.

**⇄ Swap Player button** (per match) — Replaces a player in that match with someone else. The original match result (if any) is kept as history. Use this for no-shows or last-minute substitutions.

**Generate Knockout(s) from Standings button** — (Only appears for round robin / multi-group events after all group matches are complete.) Takes the top finishers from the standings and builds a knockout bracket.

**Archive Finished Tournament button** — Moves the completed tournament to the archive. It disappears from the live view but stays accessible in History.

**Back to Setup button** — Returns to the tournament setup screen.

---

### Data

Import, export, and manage the database.

**Export Data button** — Downloads the entire database as a JSON file. Do this regularly as a backup.

**Import Data button** — Uploads a previously exported JSON file. **This overwrites the current database.** You'll get a confirmation prompt first.

**🗑 Wipe Test Data button** *(Owner only — admins and directors do not see this)* — Deletes ALL players, match history, pending submissions, and tournaments. This is for starting completely fresh (e.g., clearing test data before going live). **This cannot be undone.** You'll get two confirmation prompts.

---

### Roles

*(Owner only — no one else sees this tab.)*

Manage who can access the admin functions.

**Current admins list** — Shows everyone with a role: their email, current role, and when they were added.

**Change role dropdown** (per person) — Switch someone between Admin and Director.

**Remove** (per person) — Revokes their access entirely. They'll go back to "no role" status.

**Access Requests** — When someone logs in but has no role, they can click "Request Access." Their email appears here with **Approve as Admin** and **Approve as Director** buttons, or **Deny**.

---

## User Roles Explained

| Capability | Owner | Admin | Director | No Role | Public |
|---|---|---|---|---|---|
| View rankings, brackets, history | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit match results | ✅ | ✅ | ✅ | ✅ | ✅ |
| Live scoring (volunteer) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Approve/reject review queue | ✅ | ✅ | ❌ | ❌ | ❌ |
| Add/edit/retire players | ✅ | ✅ | ❌ | ❌ | ❌ |
| Build and run tournaments | ✅ | ✅ | ✅ | ❌ | ❌ |
| Swap players on bracket | ✅ | ✅ | ✅ | ❌ | ❌ |
| Generate knockouts from standings | ✅ | ✅ | ✅ | ❌ | ❌ |
| Import/export data | ✅ | ✅ | ❌ | ❌ | ❌ |
| Wipe test data | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage roles | ✅ | ❌ | ❌ | ❌ | ❌ |

**Owner** — Full access to everything. Only the owner can manage roles and wipe data. The first person to log in becomes the owner automatically.

**Admin** — Can do everything except manage roles and wipe data. This is the right role for trusted club officers who need to approve scores and manage players.

**Director** — Tournament tools only. Can build brackets, score matches, and swap players, but cannot approve review queue items, manage players, or touch data. Good for tournament-day volunteers who need bracket access.

**No Role** — Logged in but not yet approved. Can request access from the Admin tab.

**Public (not logged in)** — Can view everything and submit scores/results, but all submissions go through the review queue.

---

## Common Workflows

### Running a Tournament (Start to Finish)

1. Log in and go to **Admin → Tournaments**.
2. Enter the **Tournament Name** (e.g., "2026 Spring Open").
3. Choose **Singles** or **Doubles**.
4. Pick a **Format** (single elim, double elim, round robin, or multi-group).
5. Choose a **Seeding** method (ELO auto, random, or manual).
6. Enter an **Event Name** (e.g., "Men's Singles").
7. In the **Players** column, click players to add them to **Selected Players**.
8. Click **Lock Event**. Repeat steps 3–7 for additional events.
9. Click **Start Tournament**. The bracket is now live.
10. During the tournament, click **Enter Score** on any match to score it (live or final).
11. Use **⇄ Swap Player** for no-shows or substitutions.
12. For round robin events, click **Generate Knockout(s) from Standings** when group play is done.
13. When the tournament is over, click **Archive Finished Tournament**.

### Entering a Casual Match Result

1. Go to **Enter Results** (no login needed).
2. Pick Singles or Doubles, select winners and losers, enter game scores.
3. Hit Submit. It goes to the review queue.
4. An admin approves it in **Admin → Review**. ELOs update.

### Approving Submissions

1. Log in, go to **Admin → Review**.
2. Check each submission for accuracy (players, scores, date).
3. Click **Approve** (or **Edit** if something needs fixing, or **Reject** for bad entries).
4. Approved matches immediately affect ELO ratings.

### Adding a New Club Member

1. Log in, go to **Admin → Players**.
2. Fill in their name, leave ELOs at 1000 (unless they have a known rating).
3. Check **UHA Member** if they've paid dues.
4. Click **Add to Database**.

### Giving Someone Admin Access

1. They log in and click **Request Access** on the Admin tab.
2. You (owner) go to **Admin → Roles**.
3. Find their email under Access Requests.
4. Click **Approve as Admin** or **Approve as Director**.

---

## Troubleshooting

**"I submitted a score but my ELO didn't change."**
Your submission is in the review queue waiting for admin approval. ELOs only update after approval.

**"The bracket isn't updating."**
Try a hard refresh (Ctrl+Shift+R on desktop, or pull-down refresh on mobile). The app caches data for speed.

**"I can't see the Admin tab options."**
You may not be logged in, or your role doesn't include that section. Directors only see Tournaments. Check with the club owner.

**"Someone is already scoring a match and I need to take over."**
Click **Take Over** on the "Someone is scoring" message. The other person's session will be notified.

**"I locked the wrong players in an event."**
In the setup screen, find the locked event in the list and click **Delete** to remove it, then re-lock with the correct players.

**"The app looks broken or outdated."**
The app uses a service worker for offline support. If you see stale content, do a hard refresh. On mobile, you may need to close and reopen the browser tab.

**"I get 'Permission Denied' errors."**
Your login session may have expired. Log out and log back in. If it persists, your role may have been changed — check with the owner.

---

*For technical issues or feature requests, contact the club administrator.*
